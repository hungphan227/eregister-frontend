import { history } from "../routes/Routes"
import { SCREEN_NAMES, INTERNAL_EVENTS } from '../constants/Constants'
import internalEventBus from "../InternalEventBus"

const service = {
    getClientSessionId() {
        fetch("/eregister-service/get-client-session-id", {
            method: 'GET'
        }).then(res => {
            console.log('getClientSessionId res status:', res.status)
        }).catch(error => {
            console.error(error)
        })
    },

    login(username, password, onSuccess, onError) {
        console.log(localStorage.getItem("token"))  
        const user = {
            username: username, 
            password: password
        }
        fetch("/user/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            console.log('login res status:', res.status)
            if (res.status === 200) {
                res.json().then(data => {
                  console.log(data)
                  localStorage.token =  'Bearer ' + data.token
                })
                onSuccess()
            } else {
                onError()
            }
        }).catch(error => {
            console.error(error)
        })
    },

    checkAuthentication(onSuccess) {
        fetch("/user/check-authentication", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.token
            },
        }).then(res => {
            console.log('checkAuthentication res status:', res.status)
            if (res.status === 200) {
                onSuccess()
            }
        }).catch(error => {
            console.error(error)
        })
    },

    logout() {
        localStorage.token = null
        internalEventBus.dispatch(INTERNAL_EVENTS.CLOSE_WEB_SOCKET, {})
        history.push(SCREEN_NAMES.SCREEN_LOGIN)

        // fetch("/eregister-service/logout", {
        //     method: 'GET'
        // }).then(res => {
        //     console.log('logout res status:', res.status)
        //     if (res.status === 200) {
        //         localStorage.token = null
        //         internalEventBus.dispatch(INTERNAL_EVENTS.CLOSE_WEB_SOCKET, {})
        //         history.push(SCREEN_NAMES.SCREEN_LOGIN)
        //     }
        // }).catch(error => {
        //     console.error(error)
        // })
    },

    getCourses(onSuccess) {
        this.callGetRestApi('/eregister-service/courses', onSuccess)
    },

    getCourse(courseId, onSuccess) {
        this.callGetRestApi('/eregister-service/course/'+courseId, onSuccess)
    },

    joinCourse(courseId, onSuccess, onError) {
        this.callRestApi('PUT', "/eregister-service/join-course/"+courseId, '', onSuccess, onError, { 'Authorization': localStorage.token })
    },

    callGetRestApi(uri, onSuccess, onError) {
        this.callRestApi('GET', uri, '', onSuccess, onError, { 'Authorization': localStorage.token })
    },

    callRestApi(method, uri, body='', onSuccess=()=>{}, onError=()=>{}, headers={}) {
        let options = {
            method: method,
            headers: headers
        }
        if (body !== '') options.body = body
        fetch(uri, options).then(res => {
            console.log('callRestApi res status:', res.status)
            if (res.status === 401) {
                history.push(SCREEN_NAMES.SCREEN_LOGIN)
                return
            }
            res.json().then(data => {
                console.log('callRestApi data:', data)
                if (res.status === 200) {
                    onSuccess(data)
                    return
                }
                onError(data)
            })
        }).catch(error => {
            console.error(error)
        })
    }
}

export default service
