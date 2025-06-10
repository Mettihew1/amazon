import { useEffect } from "react"
import { useSearchParams} from "react-router-dom";

export default function Search(){
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')

  useEffect(() => {
    console.log(query);
  }, [query])

    return(
        <div>
            <h1>{query}</h1>
        </div>
    )
}