import React ,{useEffect, useState} from 'react';
import axios from "axios";


function MainPage() {
    //states for the form feilds
    const [date, setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTaragetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
    const [CurrencyNames , setCurrencyNames] = useState([]);
    const [ loading , setLoading] = useState(true);

    //handleSubmit method
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(date, setSourceCurrency, targetCurrency, amountInSourceCurrency);
        //console.log(sourceCurrency);

        try{

            const responce = await axios.get("http://localhost:5000/convert" , {
                params: {
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountInSourceCurrency,
                },
            });

            //set responce data to target currency
            setAmountInTargetCurrency(responce.data);
            setLoading(false);

            console.log(amountInSourceCurrency , amountInTargetCurrency);



        }catch(err){
            console.error(err);
        }
    };

    //GET ALL CURRENCY NAMES
    useEffect(()=>{
        const getCurrencyNames = async() =>{
            try{
                const responce = await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setCurrencyNames(responce.data);

            }catch(err){
                console.error(err);
            }
        }
        getCurrencyNames();
           
        } , [])

  return (
    <div>
        <h1 className='text-5xl font-bold text-green-500 lg:mx-32'>Convert Your Currencies Today</h1>
        <p className='py-6 lg:mx-32 opacity-40'>
            The default keyboard shortcut is the same for all supported platforms. 
            You can also add options to the lorem command with an underscore character followed by the option name.
            How to Use Lorem Ipsum. For plaintext Lorem Ipsum, type lorem then press the Ctrl-Shift-L keyboard shortcut.
        </p>

        <div className='flex flex-col items-center justify-center mt-5 '>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>

                     <div className="mb-4">
                        <label 
                            htmlFor={date} 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Date
                        </label>
                        <input
                            onChange={(e) => setDate(e.target.value)} 
                            type="date" 
                            id={date}
                            name={date} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                            placeholder="" 
                            required 
                         />
                    </div>


                    <div className="mb-4">
                        <label 
                            htmlFor={sourceCurrency} 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Source Currency
                        </label>

                        <select
                            onChange={(e) =>setSourceCurrency(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  
                            name={sourceCurrency}
                            id={sourceCurrency}
                            value={sourceCurrency} >

                                <option value=""> Select Source Currency</option>
                                {Object.keys(CurrencyNames).map((Currency)=>(
                                    <option className="p-1 " key={Currency} value={Currency}>
                                        {CurrencyNames[Currency]}
                                    </option>
                                ))}
                        </select>
                    </div>


                    <div className="mb-4">
                        <label 
                            htmlFor={targetCurrency} 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Target Currency
                        </label>

                        <select 
                            onChange={(e) =>setTaragetCurrency(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  
                            name={targetCurrency}
                            id={targetCurrency}
                            value={targetCurrency} >

                                <option value=""> Select Target Currency</option>
                                {Object.keys(CurrencyNames).map((Currency)=>(
                                    <option className="p-1 " key={Currency} value={Currency}>
                                        {CurrencyNames[Currency]}
                                    </option>
                                ))}

                        </select> 
                    </div>


                    <div className="mb-4">
                        <label 
                            htmlFor={amountInSourceCurrency}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Amount in Source Currency
                        </label>
                        <input 
                            onChange={(e) =>setAmountInSourceCurrency(e.target.value)}
                            type="number" 
                            id={amountInSourceCurrency}
                            name={amountInSourceCurrency}

                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                            placeholder="Amount in Source Currency" 
                            required 
                         />
                    </div>

                    <button  className='px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700'>
                        Get the Target Currency
                    </button>

                </form>
            </section>
        </div>

        {!loading ? ( <section className='items-center mt-5 lg:mx-80'>
                        {amountInSourceCurrency} {CurrencyNames[sourceCurrency]} is equals to {" "}
                        <span className='font-bold text-green-500 '> {amountInTargetCurrency} </span> in {CurrencyNames[targetCurrency]}
                      </section> 
                    ) : 
                        null
        }
   
        
    </div>
  )
}

export default MainPage