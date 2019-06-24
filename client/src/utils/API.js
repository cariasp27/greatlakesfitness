import axios from "axios";

export default {
    findtrainers: function(zipcode){
        return axios.get("https://www.zipcodeapi.com/rest/zUWic7V6ReO5UzHQKieekQU1hYlkpKa87kl8LaQk3AcxADnW5e8WuXshGZaOWgbT/radius.json/" + zipcode +"/10/miles?minimal")
    }
}