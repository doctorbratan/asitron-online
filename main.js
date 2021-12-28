new Vue({
    el: '#vue',
    data: {
        categories: [],
        items: [],
        api: false,
        text: undefined,
        category: undefined
    },
    mounted(){
        this.categoriesLoad()
        this.onloadSearch()
    },
    methods:{

        categoriesLoad() {
            axios
                .get('https://asitron.herokuapp.com/api/website/category')
                .then( (response) => {
                    this.categories = response.data 
                    this.category = this.categories[0]
                } )
        },

        onloadSearch()  {
            axios
            .post('https://asitron.herokuapp.com/api/website/items', {
                text: "iphone ",
                category: "Чехлы"
            })
            .then( (response) => {
                this.items = response.data.sort( (a, b) => { return a.position - b.position; }  )
            }) 
        },

        search() {
             axios
                .post('https://asitron.herokuapp.com/api/website/items', {
                    text: this.text,
                    category: this.category
                })
                .then( (response) => {
                    this.api = true
                    this.items = response.data.sort( (a, b) => { return a.position - b.position; }  )
                }) 
        }
    }
})