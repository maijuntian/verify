import IssueDao from "../../dao/issueDao";
import productDao from "../../dao/productDao";


const authentication = async (url) => {
    if (url.indexOf("clear") !== -1) {
        return JSON.parse('{"code": 1000}');
    }
    return productDao.authenticationDao(url);
};


export default {
    authentication,
}