import React, {createContext, useState} from 'react';
import {API} from '../config/API';
import axios from 'axios';
import {Alert} from 'react-native';

interface ApiContextProps {
  children: React.ReactNode;
}

export const ApiContext = createContext<{
  getProvinsi: () => Promise<void>;
  provinsi: {label: string; value: string}[];
  getKota: (provinsiId: string) => Promise<void>;
  kota: {label: string; value: string}[];
  getKecamatan: (kotaId: string) => Promise<void>;
  kecamatan: {label: string; value: string}[];
  register: (
    nama: string,
    provinsi: string,
    kota: string,
    kecamatan: string,
  ) => Promise<void>;
}>({
  getProvinsi: async () => {},
  provinsi: [],
  getKota: async () => {},
  kota: [],
  getKecamatan: async () => {},
  kecamatan: [],
  register: async () => {},
});

export const ApiContextProvider = ({children}: ApiContextProps) => {
  const [provinsi, setProvinsi] = useState<{label: string; value: string}[]>(
    [],
  );
  const [kota, setKota] = useState<{label: string; value: string}[]>([]);
  const [kecamatan, setKecamatan] = useState<{label: string; value: string}[]>(
    [],
  );

  const getProvinsi = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API.API_KEY,
      },
    };

    const url = API.API_PROVINSI;

    try {
      const response = await axios.get(url, config);
      const data = response.data.data;

      setProvinsi(
        data.map((item: any) => ({
          label: item.name,
          value: item.id,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getKota = async (provinsiId: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API.API_KEY,
      },
    };

    const url = API.API_KOTA + '?provinsi_id=' + provinsiId;

    try {
      const response = await axios.get(url, config);
      const data = response.data.data;

      setKota(
        data.map((item: any) => ({
          label: item.name,
          value: item.id,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getKecamatan = async (kotaId: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API.API_KEY,
      },
    };

    const url = API.API_KECAMATAN + '?kota_id=' + kotaId;

    try {
      const response = await axios.get(url, config);
      const data = response.data.data;

      setKecamatan(
        data.map((item: any) => ({
          label: item.name,
          value: item.id,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (
    nama: string,
    provinsi: string,
    kota: string,
    kecamatan: string,
  ) => {
    if (nama != '' && provinsi != '' && kota != '' && kecamatan != '') {
      const message = `Registrasi User Baru\nNama: ${nama}\nProvinsi: ${provinsi}\nKota: ${kota}\nKecamatan: ${kecamatan}`;
      const data = new FormData();
      data.append('target', '087877716373');
      data.append('message', message);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API.API_REGISTER,
        headers: {
          Authorization: 'c@zDdgaxPAaxmGPIDMey',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          Alert.alert(response.data.detail)
        })
        .catch(error => {
          Alert.alert('Error')
        });
    } else {
      Alert.alert('Semua Field Harus Diisi');
    }
  };

  return (
    <ApiContext.Provider
      value={{
        getProvinsi,
        provinsi,
        getKota,
        kota,
        getKecamatan,
        kecamatan,
        register,
      }}>
      {children}
    </ApiContext.Provider>
  );
};
