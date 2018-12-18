export const formatDate = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
        'Nov', 'Dec']
    const date = new Date(Date.parse(dateString))
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
