export const fileToBase64 = (file: File | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]

      resolve(base64String)
    }
    reader.onerror = (error) => reject(error)
  })
}
