import {
  callapi,
  getListProductService,
  deleteProductService,
  addProductService,
  getProductById,
  updateProductService,
} from "./utils/callapi.js";
import Product from "./models/product.js";

const renderHTML = () => {
  const contentHTML = `
        <div class="card text-white bg-dark">
            <div class="card-body">
            <h4 class="card-title">Danh sách sản phẩm</h4>
            <div class="container">
                <div class="row">
                <div class="col-md-3">
                    <input
                    id="maSP"
                    class="form-control"
                    placeholder="Mã SP"
                    disabled
                    />
                </div>
                <div class="col-md-3">
                    <input id="tenSP" class="form-control" placeholder="Tên SP" />
                </div>
                <div class="col-md-3">
                    <input id="gia" class="form-control" placeholder="Giá" />
                </div>
                <div class="col-md-3">
                    <input
                    id="hinhAnh"
                    class="form-control"
                    placeholder="Link hình"
                    />
                </div>
                </div>
                <br />
                <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
                <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
            </div>
            </div>
        </div>
        <div class="container">
            <table class="table">
            <thead>
                <tr>
                <th>Mã SP</th>
                <th>Tên SP</th>
                <th>Giá</th>
                <th>Hình ảnh</th>
                <th></th>
                </tr>
            </thead>
            <tbody id="tblDanhSachSanPham"></tbody>
            </table>
        </div>
    `;

  document.getElementById("root").innerHTML = contentHTML;
};

const renderTable = (listProduct) => {
  if (listProduct && listProduct.length > 0) {
    let contentHTML = "";
    listProduct.forEach((product) => {
      contentHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.tenSP}</td>
                    <td>${product.gia}</td>
                    <td>
                        <img src="${product.hinhAnh}" width="50" />
                    </td>
                    <td>
                        <button class="btn btn-info" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `;
    });
    return contentHTML;
  }
};

const renderListProduct = () => {
  callapi("SanPham", "GET", null)
    .then((result) => {
      const contentTbody = renderTable(result.data);
      //DOM tbody
      document.getElementById("tblDanhSachSanPham").innerHTML = contentTbody;
    })
    .catch((err) => {
      console.log(err);
    });
};

renderHTML();
renderListProduct();

/**
 * Delet Product
 */
window.deleteProduct = deleteProduct;
function deleteProduct(id) {
  callapi(`SanPham/${id}`, "DELETE", null)
    .then(() => {
      alert("Delete success");
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Edit Product
 */
window.editProduct = editProduct;
function editProduct(id) {
  callapi(`SanPham/${id}`, "GET", null)
    .then((result) => {
      /**
       * gán tất cả dữ liệu trả về ra 4 ô input
       */
      getEle("maSP").value = result.data.id;
      getEle("tenSP").value = result.data.tenSP;
      getEle("gia").value = result.data.gia;
      getEle("hinhAnh").value = result.data.hinhAnh;
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Cap nhat
 */
getEle("btnCapNhat").addEventListener("click", function () {
  //DOM lấy value từ 4 ô input
  const id = getEle("maSP").value;
  const ten = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;

  const product = new Product(id, ten, gia, hinhAnh);

  updateProductService(product)
    .then(() => {
      alert("Update Success");
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Them SP
 */
getEle("btnThem").addEventListener("click", function () {
  /**
   * DOM tới 3 ô input ten, gia , hinh
   */
  const ten = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;

  const product = new Product("", ten, gia, hinhAnh);
  callapi("SanPham", "POST", product)
    .then(() => {
      alert("Add success");
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
});

function getEle(id) {
  return document.getElementById(id);
}
