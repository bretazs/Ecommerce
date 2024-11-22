import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import api from '../../services/axios';

export default function Admin() {

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingProdutoId, setEditingProdutoId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const buscarCategorias = async () => {
      const response = await api.get('/categoria');
      console.log(response.data)
      setCategories(response.data);
    }
    const buscarProdutos = async () => {
      const response = await api.get('/produto');
      setProdutos(response.data)
    }
    buscarCategorias()
    buscarProdutos()
  }, [])

  const handleEditBook = async (e, id) => {
    e.preventDefault();
    try {
      const response = await api.put(`/produto/${id}`, {
        nome: productName,
        preco: price,
        descricao: description,
        quantidadeEstoque: stock,
        imagemUrl: imageUrl,
        category_id: categoryId,
      });

      if (response.status === 200) {
        alert("Produto atualizado com sucesso!");
        setProdutos((prevProd) =>
          prevProd.map((produto) =>
            produto.id === id ? { ...produto, ...response.data } : produto
          )
        );
        setProductName("");
        setPrice("");
        setDescription("");
        setStock("");
        setImageUrl("");
        setAuthor("");
        setCategoryId("");
        setEditingProdutoId(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };
  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/produto/${id}`);
      alert("Deletado com sucesso");
    } catch (error) {
      console.log(error);
    }

  }


  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/produto', {
        nome: productName,
        preco: price,
        descricao: description,
        quantidadeEstoque: stock,
        imagemUrl: imageUrl,
        category_id: categoryId
      });
      if (response.status === 201) {
        alert("Criado com sucesso")
        setProductName('');
        setPrice('');
        setDescription('');
        setStock('');
        setImageUrl('')
      }
    } catch (error) {
      console.error(error)
      errorMessage("Erro ao criar produto");
    }
  }

  return (
    <div>
      <Navbar />
      <main className="bg-[#f4f8f6] min-h-screen py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-orange-500 mb-6">
            Criar produto
          </h1>
          <form
            className="bg-white shadow-md rounded-lg p-6"
            onSubmit={handleCreateBook}
          >
            {successMessage && (
              <div className="mb-4 text-green-600 font-semibold">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-600 font-semibold">
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome do produto
              </label>
              <input
                type="text"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Url da imagem
              </label>
              <input
                type="text"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Estoque
              </label>
              <input
                type="number"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nome}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition"
            >
              Cadastrar
            </button>
          </form>
        </div>

        <section className="mt-6">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  {editingProdutoId === produto.id ? (
                    <form onSubmit={(e) => handleEditBook(e, book.id)}>
                      <input
                        type="text"
                        placeholder="Nome do Produto"
                        className="mb-2 w-full border p-2 rounded"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Preço"
                        className="mb-2 w-full border p-2 rounded"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <textarea
                        placeholder="Descrição"
                        className="mb-2 w-full border p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                      <input
                        type="number"
                        placeholder="Estoque"
                        className="mb-2 w-full border p-2 rounded"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="URL da Imagem"
                        className="mb-2 w-full border p-2 rounded"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                      />
                      <select
                        className="mb-2 w-full border p-2 rounded"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.nome}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProdutoId(null)}
                        className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                      >
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    <>
                      <img
                        src={produto.imagemUrl}
                        alt={produto.nome}
                        className="h-32 w-32 object-cover mb-4"
                      />
                      <h2 className="text-xl font-bold text-orange-500">
                        {produto.nome}
                      </h2>
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {produto.descricao}
                      </p>
                      <p className="text-lg text-gray-600">{`R$ ${produto.preco}`}</p>
                      <p className='text-md text-gray-500 '>{`${produto.quantidadeEstoque}`}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProdutoId(produto.id);
                            setProductName(produto.name);
                            setPrice(produto.price);
                            setDescription(produto.description);
                            setStock(produto.stockQuantity);
                            setImageUrl(produto.imageUrl);
                            setCategoryId(produto.category_id);
                          }}
                          className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteBook(produto.id)}
                          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}