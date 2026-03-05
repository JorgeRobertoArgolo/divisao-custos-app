import * as yup from 'yup';

export const schema= yup.object().shape({
    title: yup.string().min(6, 'Título precisa ter no mínimo 6 caracteres').required('Título é obrigatório!'),
    date: yup.date().required("A data é obrigatória"),
});