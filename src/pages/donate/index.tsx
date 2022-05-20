import styles from './styles.module.scss'
import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {PayPalButtons} from '@paypal/react-paypal-js';
import {database} from '../../services/firebaseConnection'
import { doc, setDoc } from 'firebase/firestore'
import {useState} from 'react'
// Client ID AdSpiqQXSeI3eaY0PRp08hCA5IdkkptuoueizI3m-Yv7FLh_3g9PfGHLqafyKFelyxrVF7i2vCPBlXxN
// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface DonateProp {
    user: {
        name:string,
        id: string,
        image: string
    }
}
export default function Donate ({user}:DonateProp) {
const [vip, setVip] = useState(false);
    async function saveDonate () {
        await setDoc(doc(database, 'users', user.id), {
            donate: true,
            lastDonate: new Date(),
            image: user.image
        })

    }
    return (
        <>
            <Head>
                <title>Help Board!</title>
            </Head>
            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="" />

                {vip && (
                    <div className={styles.vip}>
                    <img src={user.image} alt="" />
                    <span>Congrats! You're just became a sponsor</span>
                    </div>
                )}
                
                <h1>Become an sponsor of this project 🏆</h1>
                <h3>minimum donation of <span>R$ 5</span></h3>
                <strong>Exclusive features, add your company name to the hall of fame</strong>


                <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '5'
                            }
                        }]
                    })
                }}
                onApprove = {(data, actions) => {
                    return actions.order.capture()
                    .then((details) => {
                        saveDonate()
                    })
                    .then(() => {
                        setVip(true);
                    })
                }}
                />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req})

    if (!session?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const user = {
        id: session?.id,
        name: session?.user.name,
        image: session?.user.image
    }
    return {
        props: {
            user
        }
    }
}