import dayjs from 'dayjs'

export const useDateFormat = () => {
  const formatDate = (value: string | Date, format = 'DD/MM/YYYY') => {
    return dayjs(value).format(format)
  }

  const formatDateTime = (value: string | Date, format = 'DD/MM/YYYY HH:mm') => {
    return dayjs(value).format(format)
  }

  return {
    formatDate,
    formatDateTime
  }
}
