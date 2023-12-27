import UserService from "../Services/UserService"

export const getEmployeeName = async (id) => {
    const response = await UserService.get()
    let employeeName = response && response?.data.find((item)=> item.id == id)
    return employeeName?.name

}