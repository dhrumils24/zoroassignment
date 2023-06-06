import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function index() {
    const router = useRouter()
    useEffect(() => {
        router.push('/home')
    })
    return (
        <div></div>
    )
}
