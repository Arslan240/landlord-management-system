import React from "react"

const Avatar = ({ small, src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" }) => {
  return (
    <div tabindex="0" role="button" class="avatar h-fit min-h-fit justify-start w-fit">
      <div class={`${small ? "w-7" : "w-9"} rounded-full`}>
        <img alt="Tailwind CSS Navbar component" src={src} />
      </div>
    </div>
  )
}

export default Avatar
