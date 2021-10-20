import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IProduct {
    productId: number
    productNr: number
    customerNr: number
    invoiceNr: number
    serialNr: string
}

let baseUrl: string = "https://customerrestservice.azurewebsites.net/api/Products"


new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        updateData: { productId: "", productNr: "", customerNr: "", invoiceNr: "", serialNr: ""},
        updateMessage: "",
    },
    // Når data fra en anden HTML-side bliver transporteret til dette program, så bliver kun det der nævnes nedenunder tilføjet til et felt på HTML-siden.
    created() {
        let params = new URLSearchParams(location.search);
        this.updateData.productId = params.get('productId')
        this.updateData.productNr = params.get('productNr')
        this.updateData.customerNr = params.get('customerNr')
        this.updateData.invoiceNr = params.get('invoiceNr')
    },
    methods: {
        // Opdatere en vare til databasen, så længe den bruger URL'en og varens ID.
        updateProduct() {
            let url: string = baseUrl + "/" + this.updateData.productId
            axios.put<IProduct>(url, this.updateData)
                .then((response: AxiosResponse) => {
                    let message: string = response.statusText + " varen er opdateret."
                    this.updateMessage = message
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})
