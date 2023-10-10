import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../config/styles';
import {ApiContext} from '../context/ApiContext';

export default function MainScreen() {
  const [nama, setNama] = useState('');
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [openKota, setOpenKota] = useState(false);
  const [openKecamatan, setOpenKecamatan] = useState(false);
  const [provinsiId, setProvinsiId] = useState(null);
  const [provinsiName, setProvinsiName] = useState('');
  const [kotaId, setKotaId] = useState(null);
  const [kotaName, setKotaName] = useState('');
  const [kecamatanId, setKecamatanId] = useState(null);
  const [kecamatanName, setKecamatanName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    getProvinsi,
    provinsi,
    getKota,
    kota,
    getKecamatan,
    kecamatan,
    register,
  } = React.useContext(ApiContext);

  const closeOtherDropdowns = (dropdownToOpen: string) => {
    if (dropdownToOpen !== 'provinsi') {
      setOpenProvinsi(false);
    }
    if (dropdownToOpen !== 'kota') {
      setOpenKota(false);
    }
    if (dropdownToOpen !== 'kecamatan') {
      setOpenKecamatan(false);
    }
  };

  const handleOpenProvinsi = () => {
    closeOtherDropdowns('provinsi');
    setOpenProvinsi(!openProvinsi);
  };

  const handleOpenKota = () => {
    closeOtherDropdowns('kota');
    setOpenKota(!openKota);
  };

  const handleOpenKecamatan = () => {
    closeOtherDropdowns('kecamatan');
    setOpenKecamatan(!openKecamatan);
  };

  const handleRegister = async () => {
    try {
      await register(nama, provinsiName, kotaName, kecamatanName);
      setNama('');
      setProvinsiName('');
      setProvinsiId(null);
      setKotaName('');
      setKotaId(null);
      setKecamatanName('');
      setKecamatanId(null);
      getKota('');
      getKecamatan('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getProvinsi();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            style={styles.headerIcon}
            name="account-multiple-plus"
            size={40}
            color="#fff"
          />
          <Text style={styles.textHeader}>React Native</Text>
          <Text style={styles.textHeader}>User Registration Form</Text>
        </View>
        <Text style={styles.subText}>GoAPI / Emsifa Location API</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          placeholderTextColor="#fff"
          value={nama}
          onChangeText={setNama}
        />
        <DropDownPicker
          open={openProvinsi}
          onOpen={handleOpenProvinsi}
          onClose={() => setOpenProvinsi(false)}
          value={provinsiId}
          items={provinsi}
          setOpen={setOpenProvinsi}
          setValue={setProvinsiId}
          onChangeValue={provinsiId => {
            const selectedProvinsi = provinsi.find(
              item => item && item.value === provinsiId,
            ) as unknown as {value: string; label: string};
            if (selectedProvinsi) {
              setProvinsiName(selectedProvinsi.label);
            }
            if (provinsiId) {
              getKota(provinsiId);
            }
          }}
          style={styles.dropDownPicker}
          placeholderStyle={{color: '#fff'}}
          dropDownContainerStyle={styles.dropDownContainer}
          listItemContainerStyle={styles.dropDownItem}
          textStyle={{color: '#fff'}}
          placeholder="Pilih Provinsi"
          ArrowDownIconComponent={() => (
            <Icon name="menu-down" size={24} color="#fff" />
          )}
          ArrowUpIconComponent={() => (
            <Icon name="menu-up" size={24} color="#fff" />
          )}
          searchable={true}
          searchPlaceholder="Cari Provinsi..."
          searchContainerStyle={styles.searchContainer}
          searchTextInputStyle={{color: '#fff'}}
          zIndex={3000}
        />
        <DropDownPicker
          open={openKota}
          onOpen={handleOpenKota}
          onClose={() => setOpenKota(false)}
          value={kotaId}
          items={kota}
          setOpen={setOpenKota}
          setValue={setKotaId}
          onChangeValue={kotaId => {
            const selectedKota = kota.find(
              item => item && item.value === kotaId,
            ) as unknown as {value: string; label: string};
            if (selectedKota) {
              setKotaName(selectedKota.label);
            }
            if (kotaId) {
              getKecamatan(kotaId);
            }
          }}
          style={styles.dropDownPicker}
          placeholderStyle={{color: '#fff'}}
          dropDownContainerStyle={styles.dropDownContainer}
          listItemContainerStyle={styles.dropDownItem}
          textStyle={{color: '#fff'}}
          placeholder="Pilih Kota"
          ArrowDownIconComponent={() => (
            <Icon name="menu-down" size={24} color="#fff" />
          )}
          ArrowUpIconComponent={() => (
            <Icon name="menu-up" size={24} color="#fff" />
          )}
          searchable={true}
          searchPlaceholder="Cari Kota..."
          searchContainerStyle={styles.searchContainer}
          searchTextInputStyle={{color: '#fff'}}
          zIndex={2000}
        />
        <DropDownPicker
          open={openKecamatan}
          onOpen={handleOpenKecamatan}
          onClose={() => setOpenKecamatan(false)}
          value={kecamatanId}
          items={kecamatan}
          setOpen={setOpenKecamatan}
          setValue={setKecamatanId}
          onChangeValue={kecamatanId => {
            const selectedKecamatan = kecamatan.find(
              item => item && item.value === kecamatanId,
            ) as unknown as {value: string; label: string};
            if (selectedKecamatan) {
              setKecamatanName(selectedKecamatan.label);
            }
          }}
          style={styles.dropDownPicker}
          placeholderStyle={{color: '#fff'}}
          dropDownContainerStyle={styles.dropDownContainer}
          listItemContainerStyle={styles.dropDownItem}
          textStyle={{color: '#fff'}}
          placeholder="Pilih Kecamatan"
          ArrowDownIconComponent={() => (
            <Icon name="menu-down" size={24} color="#fff" />
          )}
          ArrowUpIconComponent={() => (
            <Icon name="menu-up" size={24} color="#fff" />
          )}
          searchable={true}
          searchPlaceholder="Cari Kecamatan..."
          searchContainerStyle={styles.searchContainer}
          searchTextInputStyle={{color: '#fff'}}
          zIndex={1000}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsLoading(true);
            handleRegister();
          }}
          disabled={isLoading}>
          {!isLoading ? (
            <Text style={styles.buttonText}>Register</Text>
          ) : (
            <ActivityIndicator color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
