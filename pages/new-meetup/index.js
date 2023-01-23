import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(meetupData) {
    console.log(meetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </Fragment>
  );
}

export default NewMeetupPage;
