"use client"

import {useEffect, useState} from "react"

type UseFetchResult<T> = {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData(){
            try{
                setLoading(true)
                setError(null)

                const response = await fetch(url)

                if(!response.ok){
                    throw new Error("Ошибка загрузки")
                }
                const result: T = await response.json()
                setData(result)
            }catch(error){
                if (error instanceof Error){
                    setError(error.message)
                }
                else{
                    setError("Неизвестная ошибка")
                }
            }
            finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [url])

    return{
        data,
        loading,
        error
    }
}