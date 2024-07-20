
      //variabel globall
      const localStorageData = 'Data';
      if(localStorage.getItem(localStorageData) ===  null){
        localStorage.setItem(localStorageData, JSON.stringify([]))
      }
      
      let data = JSON.parse(localStorage.getItem(localStorageData))
      
      function awal(dataAwal){
      if(data == []){
        return
      }
      if(dataAwal == null){
        dataAwal = data;
      }
      let nomorSD = 0;
      let nomorBD = 0;
        document.querySelector('#tableSudahDibaca').innerHTML = '';
        document.querySelector('#tableBelumDibaca').innerHTML = '';
        for(let x = 0; x<dataAwal.length;x++){
          let dataSatu = dataAwal[x];
          if(dataSatu.isComplete == true){
            document.querySelector('#tableSudahDibaca').innerHTML += `
        <tr>
                            <th scope="row">${nomorSD+=1}</th>
                            <td>${dataSatu.title}</td>
                            <td>${dataSatu.author}</td>
                            <td>${dataSatu.year}</td>
                            <td>
                                <button type="button" class="btn btn-success" onclick="javascript:toogleSelesai('${dataSatu.id}')">Selesai</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="javascript:hapus('${dataSatu.id}')">Hapus Buku</button>
                            </td>
                          </tr>
        `;
          }
          else{
            document.querySelector('#tableBelumDibaca').innerHTML += `
        <tr>
                            <th scope="row">${nomorBD+=1}</th>
                            <td>${dataSatu.title}</td>
                            <td>${dataSatu.author}</td>
                            <td>${dataSatu.year}</td>
                            <td>
                                <button type="button" class="btn btn-warning" onclick="javascript:toogleSelesai('${dataSatu.id}')">Belum Selesai</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="javascript:hapus('${dataSatu.id}')">Hapus Buku</button>
                            </td>
                          </tr>
        `;
          }
        }

        
      }
      awal()
        function modalTambah(){
            modal = new bootstrap.Modal(document.getElementById('tambahBuku'));
          document.getElementById('judul').value = ''
          document.getElementById('penulis').value = ''
          document.getElementById('tahun').value = ''
          document.getElementById('selesai').checked = false;
	        modal.toggle()
        }
        function toogleSelesai(id){
          for(i = 0; i<data.length;i++){
            let dataSatu = data[i];
            if(dataSatu.id == id && dataSatu.isComplete == false){
              dataSatu.isComplete = true;
            }else if(dataSatu.id == id && dataSatu.isComplete == true){
              dataSatu.isComplete = false;
            }
          }
          dataFix = JSON.stringify(data)
          localStorage.setItem(localStorageData, dataFix)
          awal()
        }
        function hapus(id) {
          data = data.filter(item => item.id != id);
          dataFix = JSON.stringify(data)
          localStorage.setItem(localStorageData, dataFix)
          awal()
        }
        function tambahData(){
          judul = document.getElementById('judul').value
          penulis = document.getElementById('penulis').value
          tahun = parseInt(document.getElementById('tahun').value)
          selesai = document.getElementById('selesai').checked;
          if(judul == ''){
            return;
          }else if(penulis == ''){
            return;
          }else if(tahun == ''){
            return;
          }
          const dataNew = {
            'id': +new Date(),
            'title': judul,
            'author': penulis,
            'year': tahun,
            'isComplete': selesai
          }
          data.push(dataNew)
          console.log(dataNew)
          const dataFix = JSON.stringify(data);
          localStorage.setItem(localStorageData, dataFix);
          modal.toggle()
          awal()
        }
        function search(){
          cari = document.getElementById('search').value
          find = data.filter(item => item.title.includes(cari) || item.author.includes(cari));
          awal(find)
        }
