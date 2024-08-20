import React from 'react'

const DropDownMenu = () => {
  return (
    <div className="absolute right-0 z-10 mt-2 w-44 mr-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div className="py-1" role="none">

      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200" role="menuitem"  id="menu-item-0" >My Profile</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200" role="menuitem"  id="menu-item-1">Settings</a>
      <form>
        <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-200" role="menuitem"  id="menu-item-3">Sign out</button>
      </form>
    </div>
  </div>
  )
}

export default DropDownMenu