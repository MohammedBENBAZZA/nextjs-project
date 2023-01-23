import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first meetup",
//     image: "https://static.actu.fr/uploads/2020/12/adobestock-264549883.jpeg",
//     adress: "1 test Test 12345",
//     descreption: "Test test test 1",
//   },
//   {
//     id: "m2",
//     title: "A second meetup",
//     image: "https://static.actu.fr/uploads/2020/12/adobestock-264549883.jpeg",
//     adress: "2 test Test 12345",
//     descreption: "Test test test 2",
//   },
// ];

function HomePage(props) {
  //   const [meetups, setMeetups] = useState([]);
  //  useEffect(() => {
  //       setMeetups(DUMMY_MEETUPS);
  //   }, [])
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://test:test@cluster0.lgrecah.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

export default HomePage;
