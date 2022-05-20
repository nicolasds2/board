import styles from './style.module.scss';
import Link from 'next/link';
import {SignInButton} from '../SignInButton';
import Image from 'next/image'
import logo from '../../../public/images/logo.svg'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/'>
                    <a>
                        <Image src={logo} alt="" />
                    </a>
                </Link>
                <nav>
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                    <Link href='/board'>
                        <a>My board</a>
                    </Link>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}