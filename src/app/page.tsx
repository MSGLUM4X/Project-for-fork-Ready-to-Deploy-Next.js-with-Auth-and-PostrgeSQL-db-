import ServiceButton from "@/app/components/service-button";

const HomePage = () => {
  return (
      <div className="h-full w-full flex items-center justify-center">
            <div className="bg-white/10 w-[400px] h-[400px] backdrop-blur-sm shadow-2xl rounded-full sm:rounded-2xl mb-10 flex flex-col justify-evenly items-center hover:shadow-sm transition-all duration-500">
              <div className="flex flex-col gap-20 max-w-xs w-3/5">
                  {/*
                  For each service you going to create give the good callback to be well redirect.
                  */}
                <ServiceButton callBackUrl={"callbackUrl=/service"}/>
              </div>
            </div>
      </div>
  )
}

export default HomePage;