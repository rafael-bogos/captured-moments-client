import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email)
}

export const getInitials = (name: string) => {
    if(!name) return "";

    const word = name.split(" ")
    let initial = "";

    for(let i = 0; i < Math.min(word.length, 2); i++) {
        initial += word[i][0];
    }

    return initial.toUpperCase()
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  return format(date, 'do MMM yyyy', {locale: enUS})
}