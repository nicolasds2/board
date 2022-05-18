import Head from 'next/head'
import {DonateButton} from '../../components/DonateButton';
import styles from './styles.module.scss';
import {FiPlusSquare, FiCalendar, FiEdit2, FiTrash, FiClock} from 'react-icons/fi';
export default function Board() {
    return (
        <>
        <Head>
            <title>My Tasks</title>
        </Head>
        <main className={styles.container}>
            <form>
                <input type="text" placeholder='Type your task...'/>
                <button type="submit">
                    <FiPlusSquare size={25} color='#17181f'/>
                </button>
            </form>

            <h1>You have 2 tasks!</h1>

            <section>
                <article className={styles.taskList}>
                    <p>Aprender prog e fazer grana!</p>
                    <div className={styles.action}>
                        <div>
                            <div>
                                <FiCalendar size={20} color='#ffb800'/>
                                <time>May 05, 2022</time>
                            </div>
                            <button>
                                <FiEdit2 size={20} color='#fff'/>
                                <span>Edit</span>
                            </button>
                            
                        </div>
                        <button>
                            <FiTrash size={20} color='#ff3636'/>
                            <span>Delete</span>
                        </button>
                    </div>
                </article>
                
            </section>
        </main>

        <div className={styles.vipContainer}>
            <h3>Thanks for support this project!</h3>
            <div>
                <FiClock size={28} color='#fff'/>
                <time>the last donation was 3 days ago</time>
            </div>
        </div>

        <DonateButton/>
        </>
    )
}