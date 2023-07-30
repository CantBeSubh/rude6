'use client'
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '@/src/aws-exports';
import { useEffect, useState } from 'react';
import Aside from '@/components/aside';
import Chat from '@/components/chat';

Amplify.configure({ ...awsExports, ssr: true });

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const checkUser = async () => {
      try {
        await Auth.currentAuthenticatedUser()
        setLoading(false)
      } catch (err) {
        console.log(err)
        window.location.href = "/sign-in"
      }
    }
    checkUser()
  }, [])
  if (loading) return <div>Loading...</div>
  return (
    <div className='flex'>
      <Aside />
      <Chat />
    </div>
  )
}
