# Uncaught TypeError: Cannot use 'in' operator to search for 'options' in Mumbai Solution : React Select expects the options to be passed as array of object in this format: { value: 'value here', label: 'Label here' } So, you should be passing locations as an array of objects to options prop of React-Select select as: for AutoComplete : the array of data must be of type :[{value:"",disabled:boolean}]