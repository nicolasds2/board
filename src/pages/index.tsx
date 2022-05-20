import styles from '../style/styles.module.scss';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import {database} from '../services/firebaseConnection'
import { collection, getDocs, doc, query, where } from 'firebase/firestore'
import {useState} from 'react'

type Data = {
  id: string,
  donate: boolean,
  lastDonate: Date,
  image: string
}
interface HomeProps {
  data: string
}
export default function Home({data}: HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));
  return (
    <>
      <Head>
        <title>Board - Planning tasks</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="images/board-user.svg" alt="" className={styles['board-user']}/>

        <section className={styles.callToAction}>
          <h1>Keep the tasks up to date. No more messy days.</h1>
          <p>
            <span>100% Free </span>
            and Online
          </p>
        </section>
        {donaters.length !== 0 && <h3>Sponsors:</h3>}
        <div className={styles.donaters}>
          {donaters.map(item => (
            <img key={item.id} src={item.image} alt="" />
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({}) => {
  const donaters = await getDocs(query(collection(database, "users"), where("donate", "==", true)))
  const data = JSON.stringify(donaters.docs.map(u => {
    return {
      id: u.id,
      ...u.data()
    }
  }))
  return {
    props: {
      data
    },
    revalidate: 60 * 60 // update page every 60 minutes
  }

}
