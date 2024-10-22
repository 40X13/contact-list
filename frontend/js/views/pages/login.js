import Component from "../component.js";
import Authorization from "../../api/authorization.js";

class Login extends Component {
    constructor() {
        super();
        this.authorization = new Authorization();
    }

    async getData() {
        const isAuth = await this.authorization.isAuth();
        if (isAuth) return this.authorization.getUserData(isAuth);
    }

    render(userName) {

        return new Promise(resolve => {

            let html = userName ?
                (`<div class="login-auth">
                    <h1>
                        Hello
                            <a href="#">
                                 ${userName}
                            </a>
                        !!
                    </h1>
                    <div class="login__btn">
                        <input type="submit" value="log out"/>
                    </div>

                </div>`)
                :
                (`<form class="login">
                   <div class="login__login">
                        <label for="login">Enter your login: </label>
                        <input type="text" name="name" id="login" required/>
                    </div>
                    <div class="login__password">
                        <label for="password">Enter your email: </label>
                        <input type="password" name="email" id="password" required/>
                    </div>
                    <div class="login__btn btn">
                        <input type="submit" value="log in"/>
                    </div>
                </form>`);
            resolve(html);
        });
    }

}

export default Login;