import LogOutButton from "@/app/components/log-out-button";

const AdminPage = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-20">
            <p> Welcome to your Admin Dashboard </p>
            <LogOutButton/>
        </div>
    )
}

export default AdminPage;