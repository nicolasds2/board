import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {database} from '../../services/firebaseConnection'
import { getDoc, doc} from 'firebase/firestore'
import {format} from 'date-fns';
import styles from './task.module.scss'
import Head from 'next/head'
import {FiCalendar} from 'react-icons/fi'

// Setting Task class
type Task = {
    id: string;
    created: string | Date;
    createdFormated?: string;
    task: string;
    userId: string;
    name: string
}

// Setting type to data2 var

interface TaskListProps {
    data2: string
}
export default function Task({data2}:TaskListProps) {
    const task = JSON.parse(data2) as Task
    return (
        <>
            <Head>
                <title>Task details</title>
            </Head>
            <article className={styles.container}>
                <div className={styles.action}>
                    <div>
                        <FiCalendar size={30} color='#fff'/>
                        <span>Tarefa criada:</span>
                        <time>{task.createdFormated}</time>
                    </div>
                </div>
                <p>{task.task}</p>
            </article>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    // Receiving url param 'id'
    const {id} = params

    const session = await getSession({req})

    // If user is not vip, then redirect to board. Only vip user can acess this page
    if (!session?.vip) {
        
        return {
            redirect: {
                destination: '/board',
                permanent: false
            }
        }
    }

    // A little trick
    let data2;

    // Get the task snapshot from database using id param
    const docSnap = await getDoc(doc(database, "tasks", String(id)))
    .then((snapshot) => {
        const data = {
            id: snapshot.id,
            created: snapshot.data().created,
            createdFormated: format(snapshot.data().created.toDate(), 'MMMM dd yyyy'),
            task: snapshot.data().task,
            userId: snapshot.data().userId,
            name: snapshot.data().name
        }

        data2 = JSON.stringify(data)
    })
    .catch((err) => {
        return {}
    })

    // Prevent user to access a deleted task
    if (!data2) {
        return {
            redirect: {
                destination: '/board',
                permanent: false
            }
        }
    }

    return {
        props: {
            data2
        }
    }
    
    }