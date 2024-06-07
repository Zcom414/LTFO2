export const token = () => {
    
    const tokenFromLS = JSON.parse(localStorage.getItem("token"))
    
    if(tokenFromLS){
        return {
            
            Authorization: `Bearer ${tokenFromLS}`
        }
    }else {
        return {}
    }
    
}