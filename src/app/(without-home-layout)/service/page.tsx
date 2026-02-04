import LogOutButton from "@/app/components/log-out-button";
import styles from "@/ui/styles/example.module.css"
import {auth} from "@/auth";


const ServicePage = async () => {
    const session = await auth();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-20">
            <p className={/* you can see here that text blue is overwritten by our styles modules*/`text-blue-500 font-bold ${styles.pCustom} `}> Welcome {session?.user?.name || ""} to the first service</p>
            <LogOutButton/>
        </div>
    )
}

export default ServicePage;