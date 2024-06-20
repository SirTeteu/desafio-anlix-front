const axios = require("axios");

export const API_PATH = "http://localhost:8000/api"

function core(args) {
	axios({
		url: args.url,
		method: args.method,
		data: args.data,
		params: args.params,
	})
	.then(response => {
		if (args.success) {
            // para debug
			console.log(args.method + " - " + args.url);
			console.log(args);
            console.log(response);
            
            // retornando sucesso
            args.success(response.data.data)
		}

	})
	.catch(e => {
        if (e.toString().includes("Network Error")) {
            console.warn("Não conseguiu se comunicar com o servidor...");

            args.error({msg: "Não conseguiu se comunicar com o servidor..."});
            
            return;
        }

		console.log(args.method + " - " + args.url);

		console.error("Erro inesperado!");
		console.log(e);
		console.log(e.response);
        args.error(e.response);
	})
}

export function get(args) {
	args.method = 'get';
	core(args);
}

export function post(args) {
	args.method = 'post';
	core(args);
}

export function put(args) {
	args.method = 'put';
	core(args);
}

export function del(args) {
	args.method = 'delete';
	core(args);
}


