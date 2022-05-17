import style from './styles.module.scss';
import { FaGithub } from "react-icons/fa"; 
import { FiX } from "react-icons/fi"; 
export function SignInButton() {

    const session = true

    // ternary operator to decide which button shows on sign area. If user session is true, show
    // photo and username. If it is not, show login option.
    return session ? (
        <button className={style.SignInBtn}>
        <img src='../../images/me.jpg'/>
        Ola, Nicolas!
        <FiX color='#737380' className={style.closeIcon}/>
        </button>
    ) :
        <button className={style.SignInBtn}>
        <FaGithub color='#ffb800'/>
        Login GitHub
        </button>
}