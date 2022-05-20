import Head from 'next/head'
import {useState, FormEvent} from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {DonateButton} from '../../components/DonateButton';
import styles from './styles.module.scss';
import {FiPlusSquare, FiCalendar, FiEdit2, FiTrash, FiClock, FiX} from 'react-icons/fi';
import {database} from '../../services/firebaseConnection'
import { collection, addDoc, getDocs, doc, query, where, deleteDoc, updateDoc } from 'firebase/firestore'
import {format, toDate, formatDistance} from 'date-fns';
import {enUS} from 'date-fns/locale';
import Link from 'next/link';


type TaskList = {
    id: string;
    created: string | Date;
    createdFormated?: string;
    task: string;
    userId: string;
    name: string
}
interface BoardProps {
    user: {
        id: string;
        name: string;
        vip: boolean,
        lastDonate: string | Date
    }
    data: string
}


export default function Board({user, data}: BoardProps) {

    const [input, setInput] = useState('')
    const [listTasks, setListTasks] = useState<TaskList[]>(JSON.parse(data))
    const dbInstance = collection(database, 'tasks')
    const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)

    async function addTask (e: FormEvent) {
        e.preventDefault();    

        if (input === '') {
            alert ('The field is empty!')
            return
        }

        if (taskEdit) {
            let taskRef = doc(database, 'tasks', taskEdit.id)
            await updateDoc(taskRef, {
                task: input
            })
            .then (() => {
                let data = listTasks
                let taskIndex = listTasks.findIndex(item => item.id === taskEdit.id)
                data[taskIndex].task = input

                setTaskEdit(null)
                setInput('')
            })

            return
        }

        await addDoc(dbInstance, {
            created: new Date(),
            task: input,
            userId: user.id,
            name: user.name
        })
        .then((doc) => {
            let data = {
                id: doc.id,
                created: new Date(),
                createdFormated: format(new Date(), 'MMMM dd yyyy'),
                task: input,
                userId: user.id,
                name: user.name
            }
            setListTasks([...listTasks, data])
            setInput('')
        })
        .catch((err) => {
            console.log('Error!', err)
        })
    }

    async function deleteTask(id: string) {
        await deleteDoc(doc(database, 'tasks', id))
        .then (() => {
            let deletedTask = listTasks.filter((item) => {
                return (item.id !== id)

            })
            setListTasks(deletedTask)
        })
        
        .catch ((err) => {
            console.log ('error')
        })
             
    }

    async function editTask (task: TaskList) {
        setTaskEdit(task)
        setInput(task.task)
    }

    function cancelEdit () {
        setInput('')
        setTaskEdit(null)
    }
    return (
        <>
        <Head>
            <title>My Tasks</title>
        </Head>
        <main className={styles.container}>

            {taskEdit && (
                <span className={styles.warnText}>
                    <button onClick={cancelEdit}>
                        <FiX size={20} color='#ff3636'/>
                    </button>
                    You are editing a task
                </span>
            )}
            <form onSubmit={addTask}>
                <input type="text"
                placeholder='Type your task...'
                value={input}
                onChange={ (e) => setInput(e.target.value) }
                />

                <button type="submit">
                    <FiPlusSquare size={25} color='#17181f'/>
                </button>
            </form>

            <h1>You have {listTasks.length} {listTasks.length <= 1 ? 'task' : 'tasks'}!</h1>

            <section>
                {
                    listTasks.map(task => (
                    <article className={styles.taskList} key={task.id}>
                        <Link href={`/board/${task.id}`}>
                            <p>{task.task}</p>
                        </Link>
                        <div className={styles.action}>
                    <div>
                        <div>
                            <FiCalendar size={20} color='#ffb800'/>
                            <time>{task.createdFormated}</time>
                        </div>
                        {user.vip && (
                            <button onClick={() => editTask(task)}>
                                <FiEdit2 size={20} color='#fff'/>
                                <span>Edit</span>
                            </button>
                        )}
                        
                        
                    </div>
                    <button onClick={() => deleteTask(task.id)}>
                        <FiTrash size={20} color='#ff3636'/>
                        <span>Delete</span>
                    </button>
                    </div>
                </article>

                    ))}
                
                
            </section>
        </main>
        
        {user.vip && (
            <div className={styles.vipContainer}>
            <h3>Thanks for support this project!</h3>
            <div>
                <FiClock size={28} color='#fff'/>
                <time>the last donation was {formatDistance(new Date(user.lastDonate), new Date(), {locale: enUS})}</time>
            </div>
        </div>
        )}
        

        <DonateButton/>
        </>
    )

}
export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req})
    console.log(session)

    if (!session?.id) {
        // If user is not logged, then redirect to home
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    

    const q = await query(collection(database, "tasks"), where("userId", "==", `${session.id}`));

    const tasks = await getDocs(q);
    const data =  JSON.stringify(tasks.docs.map(t => {
        return {

            id: t.id,
            createdFormated: format(t.data().created.toDate(), 'MMMM dd yyyy'),
            ...t.data(),
        }
    }))



    const user = {
        name: session?.user.name,
        id: session?.id,
        vip: session?.vip,
        lastDonate: session?.lastDonate
    }
    return {
        props: {
            user,
            data
        }
    }
}
