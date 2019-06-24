import axios from "axios";

export default {
    findtrainers: function(zipcode){
        return axios.get('/search/'+ zipcode)
    }
}