import styles from './styles.module.scss';
import Link from 'next/link';
export function DonateButton() {
    return (
        <div className={styles.donateContainer}>
            <Link href='/donate'>
                <button>Donate!</button>
            </Link>
        </div>
    )
}