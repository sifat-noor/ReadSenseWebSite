
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("No JWT");
      console.log(status);
      void signIn();
    } else if (status === "authenticated") {
      if(session.user.agreementSigned){
        router.push("/existingUserContext");
      } else {
        getUserAgreement(session.user.id).then((agreementSigned) => {
          if(agreementSigned){
            router.push("/existingUserContext");
          } else {
            router.push("/newUserIntro");
          }
        });
      }
    }
  }, [status]);

  const getUserAgreement = async (id) => {
    let response = undefined;
    try {
      response = await fetch(process.env.NEXT_PUBLIC_READSENSE_API_URL+"/api/users/"+id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
        method: "GET",
      });
    }
    catch (error) {
      console.error("An unexpected error happened occurred:", error);
      return false;
    }

    if (response?.status === 200) {
      console.log("Got 200 response from server");
      const data = await response.json();
      console.log(data);
      return data.agreementSigned;
    } else {
      return false;
    }
  };
  return <div>loading....</div>;
}
