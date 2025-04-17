export const getInitails = (name) => {  
    if(!name) return ""
    // Split the name by spaces to get individual names
    const words = name.split(" ")
    let initials = ""
    for (let i = 0; i < Math.min(words.length); i++) {
        initials += words[i][0] // Get the first character of each name
    }
    return initials.toUpperCase()
}