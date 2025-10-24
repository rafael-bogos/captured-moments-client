"use client";

import { axiosInstance } from "@/src/api/axios-instance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { CapturedMomentCard } from "../components/card/captured-moment-card";
import { EmptyCard } from "../components/card/empty-card";
import { toast } from "react-toastify";
import Modal from 'react-modal'
import { MdAdd } from "react-icons/md";
import { ViewTravelMoment } from "../components/view-travel-moment";
import { AddEditTravelMoment } from "../components/add-edit-travel-moment";
import { DateFilter } from "../components/date-filter";
import { DateRange } from "react-day-picker";
import EmptyImg from '../../assets/empty-memories.svg'

interface MomentsProps {
  id: string
  imageUrl: string
  isFavorite: boolean
  story: string
  title: string
  userId: string
  visitedDate: string
  visitedLocation: string[]
}

interface UserInfoProps {
  created_at: string
  email: string
  fullName: string
  id: string
  password: string
  uptaded_at: string
}

interface ModalProps {
  isShow: boolean
  type: string
  data: MomentsProps | null
}

export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null)
  const [allMoments, setAllMoments] = useState<MomentsProps[]>([])
  const [dateRage, setDateRage] = useState<DateRange | undefined>()

  const [openAddEditModal, setOpenAddEditModal] = useState<ModalProps>({
    isShow: false,
    type: 'add',
    data: null
  })

  const [openViewModal, setOpenViewModal] = useState<ModalProps>({
    isShow: false,
    type: 'view',
    data: null
  })


  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user')
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.clear()
          router.push("/login")
        }
      }
    }
  }

  const getAllCapturedMoments = async () => {
    try {
      const response = await axiosInstance.get('get-all-moments');

      console.log("AllMoments: ", response)
      if (response.data.moments) {
        setAllMoments(response.data.moments)
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error)
    }
  }

  const handleDeleteCapturedMoment = async (data: MomentsProps | null) => {
    const momentId = data?.id

    try {
      const response = await axiosInstance.delete(`/delete-moment/${momentId}`)

      if (response.data) {
        toast.success('Moment Deleted Successfuly');
        setOpenViewModal((prevState) => ({ ...prevState, isShow: false }))
        getAllCapturedMoments()
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error)
    }
  }

  const filterMomentsByDate = async (newSelected: DateRange | undefined) => {
    try {
      const startDate = newSelected?.from ? new Date(newSelected?.from).getTime() : null
      const endDate = newSelected?.to ? new Date(newSelected?.to).getTime() : null

      if (startDate && endDate) {
        const response = await axiosInstance.get('registered-moment/filter', {
          params: { startDate, endDate }
        })

        console.log(response)
        if (response.data) {
          setAllMoments(response.data)
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.message)
        }
      }
    }
  }
  const handleDaySelected = (newSelected: DateRange | undefined) => {
    setDateRage(newSelected)
    if (newSelected) {
      filterMomentsByDate(newSelected)
    } else {
      getAllCapturedMoments()
    }
  }

  const handleViewStory = (moment: MomentsProps) => {
    setOpenViewModal({ isShow: true, type: 'view', data: moment })
  }

  const updateIsFavorite = async (moment: MomentsProps) => {
    try {

      const response = await axiosInstance.patch(`/update-is-favorite/${moment.id}`, {
        isFavorite: !moment.isFavorite
      })

      console.log("response moment: ", response)
      if (response.data.favoriteUpdate) {
        toast.success('Moment Updated Successfuly')
        getAllCapturedMoments();
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.message)
        }
      }
    }
  }

  useEffect(() => {
    getUserInfo()
    getAllCapturedMoments()
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} />

      <main className="container mx-auto py-10">
        <div className="flex gap-7">
          <section className="flex-1">
            {allMoments.length > 0 ?
              <div className="grid grid-cols-3 gap-4">
                {/* CARD - MOMENT */}
                {allMoments.map((moment) => (
                  <CapturedMomentCard
                    key={moment.id}
                    imageUrl={moment.imageUrl}
                    title={moment.title}
                    story={moment.story}
                    date={moment.visitedDate}
                    visitedLocation={moment.visitedLocation}
                    isFavorite={moment.isFavorite}
                    onHandleViewStory={() => handleViewStory(moment)}
                    onFavoriteClick={() => updateIsFavorite(moment)}
                  />
                ))}
              </div>
              :
              <EmptyCard
                imgSrc={EmptyImg}
                message="Begin your first Travel Story! Click the 'Add' button to capture your thoughts, ideas, and memories. Let`s get started!"
              />
            }
          </section>

          <DateFilter dateRage={dateRage} onHandleDaySelected={handleDaySelected} />
        </div>
      </main>

      {/* Add & Edit Captured Moment */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          }
        }}
        ariaHideApp={false}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <AddEditTravelMoment
          type={openAddEditModal.type}
          momentInfo={openViewModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: 'add', data: null })
          }}
          getAllMoments={() => getAllCapturedMoments()}
        />
      </Modal>


      {/* View Captured Moment */}
      <Modal
        isOpen={openViewModal.isShow}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          }
        }}
        ariaHideApp={false}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <ViewTravelMoment
          momentInfo={openViewModal.data}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }))
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }))
            setOpenAddEditModal((prevState) => ({ ...prevState, isShow: true, type: 'edit' }))
          }}
          onDeleteClick={() => handleDeleteCapturedMoment(openViewModal.data)}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full cursor-pointer bg-[#8c52ff] hover:bg-violet-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: 'add', data: null })
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
    </>
  );
}
