import React, { useEffect, useState } from 'react'
import { useGlobal } from '@/lib/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl } from '@fortawesome/free-solid-svg-icons'

let windowTop = 0
/**
 * 点击召唤目录抽屉
 * 当屏幕下滑500像素后会出现该控件
 * @param props 父组件传入props
 * @returns {JSX.Element}
 * @constructor
 */
const TocDrawerButton = (props) => {
  const { locale } = useGlobal()
  const [show, switchShow] = useState(false)
  const scrollListener = () => {
    const scrollY = window.pageYOffset
    const shouldShow = scrollY > 100 && scrollY < windowTop
    console.log('目录', shouldShow, scrollY, windowTop)
    windowTop = scrollY

    if (shouldShow !== show) {
      switchShow(shouldShow)
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  })

  return (
    <div id='toc-drawer-button' className='right-5 fixed bottom-56 duration-500 z-40' onClick={props.onClick}>
      <div className='transform hover:scale-105 duration-200'>
        <div className={(show ? 'animate__fadeInRight' : 'hidden') + ' px-2 py-4 animate__animated glassmorphism rounded-full cursor-pointer shadow-card' }>
          <div className='text-center dark:text-gray-100'>
            <div className='w-10 text-md' title={locale.COMMON.TABLE_OF_CONTENTS} ><FontAwesomeIcon icon={faListOl} /> </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TocDrawerButton