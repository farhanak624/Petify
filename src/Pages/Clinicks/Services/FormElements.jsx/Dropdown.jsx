import React, { useState } from 'react'
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

const Dropdown = ({field,setFormFields,i,formFields}) => {
    const [ options, setOptions ] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [title,setTitle] = useState(field?.label);
    const [hide,setHide] = useState(field?.hide);
    const [instruction,setInstruction] = useState(field?.instruction);
    const [mandatory, setMandatory] = useState(field?.mandatory)
    const [ choices ,setChoices ] = useState(field?.choice || [''] )

    const handleInputChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
      };
    
      const handleAddChoice = (e) => {
        e.preventDefault();
        setChoices([...choices, '']);
      };
    
      const handleRemoveChoice = (index) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setChoices(newChoices);
      };
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        setChoices((prev)=>prev.filter(choice => choice.trim() !== ''));
        const isDuplicate = formFields.some((field, index) => field.label === title && index !== i);
        if (isDuplicate) {
            toast.warning('Label already exists. Please choose a different label.');
            return;
        }
        setFormFields((prev) =>prev.map((field, index) =>
            index === i ? { ...field, choices, label : title,hide: hide,mandatory : mandatory,instruction : instruction } : field
          ))
          closeModal();
        
    }

    const handleCopy = ()=>{
        setFormFields((prev)=>{prev.splice(i+1,0,prev[i]);return [...prev]})
    }

    const handleDelete = ()=>{
        setFormFields((prev)=>{prev.splice(i,1);return [...prev]})
    }

    const openModal = () => {
          setShowModal(true);
      };
  
      const closeModal = () => {
          setShowModal(false);
      };

      
      
  return (
    <div className="flex">
    <div  tabIndex={1} className=' my-1 w-full hover:border-2 cursor-pointer hover:m-3 focus:hover:m-0 hover:border-dashed hover:border-gray-200 focus:hover:border-solid focus:border-orange-100 focus:border-[0.02px] focus:bg-orange-600 focus:rounded-xl focus:border-l-8 focus:border-l-orange-600 focus:bg-opacity-5 focus:hover:border-orange-100 focus:hover:border-[0.02px] focus:hover:bg-orange-600 focus:hover:rounded-xl focus:hover:border-l-8 focus:hover:border-l-orange-600 focus:hover:bg-opacity-5 flex flex-col p-5 ' >
          <label>{hide ? '' : field?.label}</label>
          <select  className='w-1/2 rounded-lg px-3 border py-2 my-2 bg-transparent' disabled name={field?.name}  ></select>
          <p className=' text-xs truncate text-gray-400 ps-2 font-light'>{field?.instruction}</p>
        </div>
        {options && <div className="-mr-36 ml-3 ">
        <div onClick={openModal} className="group flex items-center">
        <div className=' my-2 border border-gray-100 shadow-md p-2 rounded-md transition-colors bg-white group-hover:bg-orange-100 duration-700'>
        <svg className='transition delay-300 fill-white group-hover:fill-black' width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.12455 8.69864L1.91242 8.48651C1.97672 8.42221 2.05305 8.3712 2.13707 8.3364L2.25188 8.61356L2.13707 8.3364C2.22109 8.3016 2.31114 8.28369 2.40207 8.28369H9.18727H9.18751V8.58369C9.23836 8.58365 9.2887 8.59388 9.3355 8.61379C9.3823 8.63369 9.42459 8.66284 9.45984 8.6995L2.12455 8.69864ZM2.12455 8.69864L1.91241 8.48651C1.84811 8.55081 1.7971 8.62715 1.7623 8.71117L2.03339 8.82346L1.7623 8.71117C1.7275 8.79518 1.70959 8.88523 1.70959 8.97617C1.70959 9.06711 1.7275 9.15716 1.7623 9.24117L2.03339 9.12888L1.7623 9.24117C1.7971 9.32519 1.84811 9.40153 1.91241 9.46583L2.11669 9.26155L1.91241 9.46583C1.97672 9.53013 2.05306 9.58114 2.13707 9.61594L2.25188 9.33878L2.13707 9.61594C2.22109 9.65074 2.31114 9.66865 2.40207 9.66865H9.17609H9.17807V9.36865L2.12455 8.69864ZM9.17807 11.3103V11.3103H2.40207C2.21842 11.3103 2.04228 11.2373 1.91241 11.1075C1.78255 10.9776 1.70959 10.8015 1.70959 10.6178C1.70959 10.4341 1.78255 10.258 1.91241 10.1281C2.04228 9.99828 2.21842 9.92532 2.40207 9.92532H9.18726H9.18751V10.2253C9.23836 10.2253 9.2887 10.2355 9.3355 10.2554L9.17807 11.3103ZM9.17807 11.3103L9.18349 11.3102C9.36365 11.307 9.53531 11.2335 9.66191 11.1055L9.17807 11.3103ZM2.35914 8.06664H8.84424L8.84235 8.07608H9.20826C9.40193 8.07608 9.58767 7.99914 9.72461 7.8622C9.86155 7.72526 9.93849 7.53952 9.93849 7.34585C9.93849 7.15219 9.86155 6.96645 9.72461 6.82951C9.58767 6.69257 9.40193 6.61563 9.20826 6.61563H2.35913C2.26332 6.60469 2.1662 6.61282 2.07339 6.63966C1.97252 6.66884 1.87912 6.71942 1.79957 6.78798C1.72003 6.85653 1.6562 6.94143 1.61245 7.03689C1.5687 7.13235 1.54605 7.23613 1.54605 7.34114C1.54605 7.44615 1.5687 7.54992 1.61245 7.64538C1.6562 7.74084 1.72003 7.82574 1.79957 7.8943C1.87912 7.96285 1.97252 8.01344 2.07339 8.04261C2.1662 8.06945 2.26333 8.07759 2.35914 8.06664ZM11.5217 4.851V12.8061C11.5198 13.2993 11.3227 13.7716 10.9733 14.1197C10.6239 14.4679 10.1507 14.6634 9.65736 14.6634H2.16432C1.67099 14.6634 1.19778 14.4679 0.848338 14.1197C0.499015 13.7716 0.301852 13.2993 0.3 12.8061V2.15732C0.301852 1.66418 0.499015 1.19185 0.848338 0.843746C1.19778 0.495523 1.67099 0.299997 2.16432 0.3H9.41642L10.2042 5.49259L10.2932 6.07943L10.7129 5.65973L11.5217 4.851ZM2.3398 4.61354H9.20826H9.21015C9.40314 4.61304 9.58811 4.53616 9.72461 4.39967C9.86155 4.26272 9.93849 4.07699 9.93849 3.88332C9.93849 3.68965 9.86155 3.50392 9.72461 3.36698C9.58767 3.23003 9.40193 3.1531 9.20826 3.1531H2.3398C2.14614 3.1531 1.9604 3.23003 1.82346 3.36698C1.68652 3.50392 1.60958 3.68965 1.60958 3.88332C1.60958 4.07699 1.68652 4.26272 1.82346 4.39967C1.9604 4.53661 2.14614 4.61354 2.3398 4.61354ZM2.40207 11.516C2.21842 11.516 2.04228 11.589 1.91241 11.7188C1.78255 11.8487 1.70959 12.0248 1.70959 12.2085C1.70959 12.3922 1.78255 12.5683 1.91241 12.6982C2.04228 12.828 2.21842 12.901 2.40207 12.901H9.17807C9.36173 12.901 9.53786 12.828 9.66773 12.6982C9.7976 12.5683 9.87056 12.3922 9.87056 12.2085C9.87056 12.0248 9.7976 11.8487 9.66773 11.7188C9.53786 11.589 9.36173 11.516 9.17807 11.516H2.40207ZM2.3398 6.34009H9.20826H9.21015C9.40314 6.33959 9.58811 6.26271 9.72461 6.12622C9.86155 5.98927 9.93849 5.80354 9.93849 5.60987C9.93849 5.4162 9.86155 5.23047 9.72461 5.09353C9.58767 4.95658 9.40193 4.87965 9.20826 4.87965H2.3398C2.14614 4.87965 1.9604 4.95658 1.82346 5.09352C1.68652 5.23047 1.60958 5.4162 1.60958 5.60987C1.60958 5.80354 1.68652 5.98927 1.82346 6.12621C1.9604 6.26316 2.14614 6.34009 2.3398 6.34009Z" stroke="black" stroke-width="0.6"/>
        <path d="M12.4374 2.89739L12.2252 2.68595L12.0134 2.89774L11.0183 3.89287L10.5239 0.697285L13.7297 1.18017L12.736 2.17518L12.5243 2.38718L12.736 2.59917L15.6381 5.50505L15.6381 5.50506L15.6399 5.50678C15.6589 5.52557 15.6741 5.54796 15.6844 5.57266C15.6948 5.59735 15.7001 5.62386 15.7001 5.65063C15.7001 5.67741 15.6948 5.70392 15.6844 5.72861C15.6741 5.7533 15.6589 5.7757 15.6399 5.79449L15.6399 5.79448L15.6385 5.79584C15.5996 5.83467 15.5468 5.85648 15.4919 5.85648C15.4369 5.85648 15.3842 5.83467 15.3452 5.79584L15.3451 5.79573L12.4374 2.89739Z" stroke="black" stroke-width="0.6"/>
        </svg>

        </div>
        <span className="bg-orange-600 px-2 text-white p-1 text-sm rounded-md ml-2 transition-opacity duration-700 opacity-0 group-hover:opacity-100">Propertise</span>
        </div>
        <div className="group flex items-center">
        <div onClick={handleCopy} className='border border-gray-100 shadow-md p-2.5 rounded-md transition-colors bg-white group-hover:bg-orange-100 duration-700'>
        <svg
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className='transition delay-300 fill-white group-hover:fill-black'
        >
            <path d="M9.18148 0.3V13.3296H0.3V0.3H9.18148Z" stroke="black" strokeWidth="0.6" />
            <path
            d="M10.3739 13.3341V2.67119H11.5516V15.7007H2.67012V14.5229H9.18503C9.85443 14.5229 10.3739 14.0034 10.3739 13.3341Z"
            stroke="black"
            strokeWidth="0.6"
            />
        </svg>
        </div>
        <span className="bg-orange-600 text-white p-1 text-sm rounded-md px-2 ml-2 transition-opacity duration-700 opacity-0 group-hover:opacity-100">Copy</span>
        </div>
        
        <div onClick={handleDelete} className="group flex items-center my-2">
            <div className='border border-gray-100 shadow-md p-2 rounded-md transition-colors bg-white group-hover:bg-orange-100 duration-700'>
            <svg
            width="14"
            height="18"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className='transition delay-300 fill-white group-hover:fill-orange-600'
        >
            <path
            d="M3.2 2.78889H3.5V2.48889V1.95556C3.5 1.03651 4.23651 0.3 5.15556 0.3H8.35556C9.2746 0.3 10.0111 1.03651 10.0111 1.95556V2.48889V2.78889H10.3111H12.9778C13.1142 2.78889 13.2111 2.88583 13.2111 3.02222C13.2111 3.15862 13.1142 3.25556 12.9778 3.25556H0.533333C0.396939 3.25556 0.3 3.15862 0.3 3.02222C0.3 2.88583 0.396939 2.78889 0.533333 2.78889H3.2ZM3.96667 2.48889V2.78889H4.26667H9.24444H9.54445V2.48889V1.95556C9.54445 1.29195 9.01916 0.766667 8.35556 0.766667H5.15556C4.49195 0.766667 3.96667 1.29195 3.96667 1.95556V2.48889ZM10.3111 15.7H3.2C2.28096 15.7 1.54444 14.9635 1.54444 14.0444V5.15556C1.54444 5.01916 1.64138 4.92222 1.77778 4.92222H11.7333C11.8697 4.92222 11.9667 5.01916 11.9667 5.15556V14.0444C11.9667 14.9635 11.2302 15.7 10.3111 15.7Z"
            stroke="black"
            strokeWidth="0.6"
            />
           </svg>
            </div>
        <span className="bg-orange-600 px-2 text-white p-1 text-sm rounded-md ml-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Delete</span>
        </div>
    </div>}
    {showModal && (
                <div  className="fixed top-0 left-0 w-full scroll-none overflow-x-auto h-full flex items-center justify-center bg-gray-700 bg-opacity-80">
                    <div className="relative bg-white rounded-2xl w-3/5">
                        
                        <div style={{backgroundColor: 'rgba(245, 137, 90, 1)'}} className="px-8 rounded-t-2xl rounded-r-none text-white flex justify-between">
                            <h1 className=' font-semibold text-xl m-3 mb-6'>Propertise</h1>
                            <div onClick={closeModal} className='mt-4'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0573 1L9 8.05733L1.94267 1L1 1.94267L8.05733 9L1 16.0573L1.94267 17L9 9.94267L16.0573 17L17 16.0573L9.94267 9L17 1.94267L16.0573 1Z" fill="white" stroke="white"/>
                            </svg>
                            </div>
                        </div>
                        <div className='px-8 '>
                            
                            <div className=''>
                                <h3 className='text-base mt-3 font-semibold'>Title</h3>
                                <input value={title} onChange={(e)=> setTitle(e.target.value)} className='rounded-lg w-full my-3 outline-1 outline-gray-200 p-4 border border-gray-100 px-6' />
                                   
                            </div>
                            <div className='rounded-lg my-7 flex align-middle items-end'>
                                <input checked={hide} onChange={()=>setHide(!hide)} className='w-6 h-6 mx-3 pt-4 ' type='checkbox' />
                                    <label className='text-base mt-3'> Hide Label</label>
                                </div>
                            <div className=''>
                                <h3 className='text-base mt-3 font-semibold'>Instructions</h3>
                                <textarea value={instruction} onChange={(e)=>setInstruction(e.target.value)} className='rounded-lg w-full my-3 outline-1 outline-gray-200 p-4 border px-6  border-gray-100' ></textarea>
                                   
                            </div>
                            <div className=' ml-4 mb-5'>
                            <h3 className='text-base font-semibold'>Validation</h3>
                                <div className='rounded-lg my-3 flex align-middle items-end'>
                                <input checked={mandatory} onChange={()=>setMandatory(!mandatory)} className='w-6 h-6 mx-3 pt-4 ' type='checkbox' />
                                    <label className='text-base mt-3'> Mandatory</label>
                                </div>
                            </div>
                            <div className=' ml-4 mb-5'>
                            <h3 className='text-base font-semibold'>Choice List</h3>
                                {choices.map((choice,index)=>(
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={choice}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className='rounded-lg w-full my-3 outline-1 outline-gray-200 p-4 border border-gray-100 px-6'
            placeholder={`Drop ${index + 1}`}
          />
          <button onClick={handleAddChoice}><img src="/add.png" className='w-8 h-8 mx-4 ml-8' alt="" /></button>
          <button onClick={() => handleRemoveChoice(index)}><img className='w-8 h-8' src="/minus.png" alt="" /></button>
          
    </div>
  ))}
                            </div>
                            
                            <div className='flex justify-end mb-4'>
                                <button onClick={closeModal} className='p-2 border rounded-lg border-gray-100'>Cancel</button>
                                <button onClick={handleSubmit} className='p-2 border bg-orange-600 rounded-lg text-white px-3 mx-4'>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
                    )}
</div>
  )
}

export default Dropdown
