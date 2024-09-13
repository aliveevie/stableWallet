import useStore from "@/functions/main";

export default function Page(){
        const { state } = useStore();

        const searchParams = new URLSearchParams(window.location.search);
        
        return (
                <div>
                        <h2>Hello PFIS NOT Implemented!</h2>
                </div>
        )

}