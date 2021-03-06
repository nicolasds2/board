import style from './styles.module.scss';
import { FaGithub } from "react-icons/fa"; 
import { FiX } from "react-icons/fi";

import {signIn, signOut, useSession} from 'next-auth/react';
import Image from 'next/image'

export function SignInButton() {

    const { data: session, status } = useSession()
    // ternary operator to decide which button shows on sign area. If user session is true, show
    // photo and username. If it is not, show login option.
    return status === 'authenticated' ? (
        <button className={style.SignInBtn}>
        <div>
            <Image width={35} height={35} src={session.user.image} alt=''/>
        </div>
        Hi, {session.user.name}!
        <FiX color='#737380' className={style.closeIcon} onClick={() => signOut()}/>
        </button>
    ) :
        <button className={style.SignInBtn} onClick={() => signIn('github')}>
        <FaGithub color='#ffb800'/>
        Login GitHub
        </button>
}