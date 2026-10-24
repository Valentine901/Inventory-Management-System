import image1 from "../assets/images/empty-state-removebg.png"


const EmptyState = () => {
  return (
    <div className='flex justify-center items-center mt-5'>
        <img src={`${image1}`} alt="" className='w-100' />
    </div>
  )
}

export default EmptyState