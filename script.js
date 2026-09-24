const USER = "wvverez";
const REPO = "cheatall";

// Formato: "## herramienta|sección" seguido de líneas "comando :: descripción"
// Marcadores editables: {u} = usuario, {h} = IP, {p} = puerto
const DATA = `
## SSH|Conexión básica
ssh {u}@{h} :: Conectar a un host
ssh {h} :: Conectar con el usuario actual
ssh -p {p} {u}@{h} :: Conectar por un puerto personalizado
ssh {u}@{h} comando :: Ejecutar un comando en el host remoto
ssh -v {u}@{h} :: Modo detallado (depuración)
ssh -q {u}@{h} :: Modo silencioso
## SSH|Claves SSH
ssh-keygen :: Generar un par de claves SSH
ssh-keygen -t ed25519 :: Generar una clave Ed25519
ssh-keygen -t rsa -b 4096 :: Generar una clave RSA de 4096 bits
ssh-keygen -p -f ~/.ssh/id_ed25519 :: Cambiar la contraseña de la clave
ssh-keygen -y -f ~/.ssh/id_ed25519 :: Mostrar la clave pública
ssh-keygen -R {h} :: Eliminar un host de known_hosts
## SSH|Copiar clave SSH
ssh-copy-id {u}@{h} :: Copiar la clave al host remoto (acceso sin contraseña)
ssh-copy-id -i ~/.ssh/key.pub {u}@{h} :: Copiar una clave concreta
ssh-copy-id -p {p} {u}@{h} :: Copiar la clave por un puerto personalizado
## SSH|Agente SSH
eval "$(ssh-agent -s)" :: Iniciar el agente SSH
ssh-add :: Añadir la clave por defecto al agente
ssh-add ~/.ssh/id_ed25519 :: Añadir una clave concreta
ssh-add -l :: Listar las claves del agente
ssh-add -d ~/.ssh/id_ed25519 :: Quitar una clave del agente
ssh-add -D :: Quitar todas las claves
## SSH|Túneles SSH
ssh -L 8080:localhost:80 {u}@{h} :: Redirección de puertos local
ssh -R 8080:localhost:80 {u}@{h} :: Redirección de puertos remota
ssh -D 1080 {u}@{h} :: Proxy SOCKS (dinámico)
ssh -N -L 8080:localhost:80 {u}@{h} :: Solo túnel (sin shell)
ssh -f -N -L 8080:localhost:80 {u}@{h} :: Túnel en segundo plano
## SSH|Archivo de configuración
~/.ssh/config :: Archivo de configuración del usuario
Host myserver :: Definir un alias de host
HostName {h} :: Dirección del servidor
User {u} :: Nombre de usuario
Port {p} :: Puerto personalizado
IdentityFile ~/.ssh/mykey :: Ruta de la clave privada
## SSH|Opciones de conexión
-i keyfile :: Archivo de identidad (clave privada)
-o option=value :: Establecer una opción de configuración
-F configfile :: Usar un archivo de configuración personalizado
-J jumphost :: Saltar a través de otro host (ProxyJump)
-X :: Activar el reenvío X11
-A :: Activar el reenvío del agente
## SSH|Seguridad
-o StrictHostKeyChecking=yes :: Comprobación estricta de la clave del host
-o UserKnownHostsFile=/dev/null :: Ignorar known_hosts
-o PasswordAuthentication=no :: Desactivar la autenticación por contraseña
-o PubkeyAuthentication=yes :: Activar la autenticación por clave
-o ConnectTimeout=10 :: Tiempo de espera de la conexión
## SSH|Multiplexado
ControlMaster auto :: Activar el multiplexado de conexiones
ControlPath ~/.ssh/sockets/%r@%h-%p :: Ruta del socket
ControlPersist 600 :: Mantener la conexión abierta 10 minutos
ssh -O check {u}@{h} :: Comprobar el estado de la conexión
ssh -O exit {u}@{h} :: Cerrar la conexión maestra
## SSH|Patrones comunes
ssh -t {u}@{h} 'sudo comando' :: Ejecutar un comando con sudo
ssh {u}@{h} 'cat file' > local :: Guardar la salida remota en un archivo local
tar czf - dir | ssh {u}@{h} 'tar xzf -' :: Copiar un directorio con tar
ssh -J jump {u}@{h} :: Conectar mediante un host de salto
ssh {u}@{h} -L 3306:localhost:3306 :: Túnel a MySQL
## FTP|Conexión y login
ftp {h} :: Conectar con el servidor
ftp {h} {p} :: Conectar a un puerto personalizado
user {u} :: Iniciar sesión (pide la contraseña)
user {u} contraseña :: Iniciar sesión con usuario y contraseña
quit :: Salir de la sesión
bye :: Salir de la sesión (alias de quit)
## FTP|Rutas locales y remotas
pwd :: Mostrar el directorio remoto actual
!pwd :: Mostrar el directorio local actual
cd /remote/path :: Cambiar de directorio remoto
lcd /local/path :: Cambiar de directorio local
ls :: Listar archivos remotos
!ls :: Listar archivos locales
## FTP|Descargar archivos
get file.txt :: Descargar un archivo
get remote.txt local.txt :: Descargar y renombrar en local
mget *.log :: Descargar varios archivos
prompt :: Activar/desactivar la confirmación en mget
reget large.iso :: Reanudar una descarga interrumpida
## FTP|Subir archivos
put file.txt :: Subir un archivo
put local.txt remote.txt :: Subir con otro nombre remoto
mput *.txt :: Subir varios archivos
append file.txt :: Añadir un archivo local a uno remoto
## FTP|Modos de transferencia
binary :: Modo de transferencia binario
ascii :: Modo de transferencia de texto
type :: Mostrar el modo de transferencia actual
hash :: Mostrar marcas de progreso
status :: Ver el estado de la sesión y la transferencia
## FTP|Gestión de archivos remotos
mkdir dirname :: Crear un directorio remoto
rmdir dirname :: Eliminar un directorio remoto
delete file.txt :: Borrar un archivo remoto
mdelete *.tmp :: Borrar varios archivos remotos
rename old.txt new.txt :: Renombrar un archivo remoto
size file.iso :: Ver el tamaño de un archivo remoto
## FTP|Conexión y seguridad
passive :: Activar/desactivar el modo pasivo
debug :: Activar/desactivar la salida de depuración
verbose :: Activar/desactivar la salida detallada
close :: Cerrar la conexión y mantener la shell FTP
open {h} :: Reconectar a otro host
!command :: Ejecutar un comando local
help :: Listar los comandos FTP disponibles
## FTP|Por lotes (sin interacción)
ftp -n {h} :: Desactivar el inicio de sesión automático
ftp -inv {h} :: Modo apto para scripts
ftp {h} < commands.txt :: Ejecutar comandos desde un archivo
## SFTP|Conexión y autenticación
sftp {u}@{h} :: Conectar con el servidor remoto
sftp -P {p} {u}@{h} :: Conectar a un puerto SSH personalizado
sftp -i ~/.ssh/id_ed25519 {u}@{h} :: Conectar con una clave concreta
sftp -b commands.txt {u}@{h} :: Ejecutar comandos desde un archivo por lotes
quit :: Salir de la sesión
bye :: Salir de la sesión (alias de quit)
## SFTP|Rutas locales y remotas
pwd :: Mostrar el directorio remoto actual
lpwd :: Mostrar el directorio local actual
cd /remote/path :: Cambiar de directorio remoto
lcd /local/path :: Cambiar de directorio local
ls :: Listar archivos remotos
lls :: Listar archivos locales
ls -la :: Listado largo de archivos remotos
## SFTP|Descargar archivos
get file.txt :: Descargar un archivo
get remote.txt local.txt :: Descargar y renombrar en local
get -r remote_dir :: Descargar un directorio de forma recursiva
get -p file.txt :: Conservar permisos y fechas
get *.log :: Descargar varios archivos con un patrón
reget large.iso :: Reanudar una descarga interrumpida
## SFTP|Subir archivos
put file.txt :: Subir un archivo
put local.txt remote.txt :: Subir con otro nombre remoto
put -r local_dir :: Subir un directorio de forma recursiva
put -p file.txt :: Conservar permisos y fechas
put *.txt :: Subir varios archivos
reput large.iso :: Reanudar una subida interrumpida
## SFTP|Gestión de archivos remotos
mkdir dirname :: Crear un directorio remoto
rmdir dirname :: Eliminar un directorio remoto vacío
rm file.txt :: Borrar un archivo remoto
rename old.txt new.txt :: Renombrar un archivo remoto
ln source link :: Crear un enlace duro remoto
ln -s source link :: Crear un enlace simbólico remoto
df -h :: Ver el uso del sistema de archivos remoto
## SFTP|Permisos y propietario
chmod 644 file.txt :: Cambiar el modo de un archivo remoto
chown 1000 file.txt :: Cambiar el propietario remoto por UID
chgrp 1000 file.txt :: Cambiar el grupo remoto por GID
lumask 022 :: Fijar la umask local para los archivos descargados
## SFTP|Ayudas de sesión
!command :: Ejecutar un comando de shell local
! :: Entrar en una shell local
version :: Mostrar la versión del protocolo SFTP
progress :: Activar/desactivar el indicador de progreso
help :: Listar los comandos SFTP disponibles
## SFTP|Scripts y modo no interactivo
sftp -q {u}@{h} :: Modo silencioso (sin banner ni progreso)
sftp -o IdentityFile=key {u}@{h} :: Pasar cualquier opción de ssh_config
echo "get file.txt" | sftp -b - {u}@{h} :: Enviar comandos por stdin
## SCP|Sintaxis básica
scp ORIGEN DESTINO :: Sintaxis general de scp
scp file.txt {u}@{h}:/path/ :: Copiar un archivo local al remoto
scp {u}@{h}:/path/file.txt . :: Copiar un archivo remoto al directorio actual
scp {u}@{h}:/path/file.txt /local/path/ :: Copiar un archivo remoto a un directorio local
## SCP|Subir archivos
scp file.txt {u}@{h}:/tmp/ :: Subir un archivo
scp file1 file2 {u}@{h}:/tmp/ :: Subir varios archivos
scp *.log {u}@{h}:/var/log/archive/ :: Subir archivos que coinciden con un patrón
scp -p file.txt {u}@{h}:/tmp/ :: Conservar fechas y permisos
## SCP|Descargar archivos
scp {u}@{h}:/tmp/file.txt . :: Descargar al directorio actual
scp {u}@{h}:/tmp/file.txt ~/Downloads/ :: Descargar a un directorio concreto
scp {u}@{h}:'/var/log/*.log' . :: Descargar con comodín remoto (entre comillas)
scp {u}@{h}:/tmp/file.txt ./new-name.txt :: Descargar y renombrar en local
## SCP|Copiar directorios
scp -r dir/ {u}@{h}:/tmp/ :: Subir un directorio de forma recursiva
scp -r {u}@{h}:/var/www/ ./backup/ :: Descargar un directorio de forma recursiva
scp -r dir1 dir2 {u}@{h}:/tmp/ :: Subir varios directorios
scp -rp project/ {u}@{h}:/srv/ :: Copia recursiva conservando atributos
## SCP|Puertos, claves e identidad
scp -P {p} file.txt {u}@{h}:/tmp/ :: Usar un puerto SSH personalizado
scp -i ~/.ssh/id_ed25519 file.txt {u}@{h}:/tmp/ :: Usar una clave privada concreta
scp -o IdentityFile=~/.ssh/id_ed25519 file.txt {u}@{h}:/tmp/ :: Indicar la clave con -o
scp -o StrictHostKeyChecking=yes file.txt {u}@{h}:/tmp/ :: Forzar la verificación de la clave del host
## SCP|Rendimiento y fiabilidad
scp -C large-file.iso {u}@{h}:/tmp/ :: Activar la compresión
scp -l 8000 file.txt {u}@{h}:/tmp/ :: Limitar el ancho de banda (Kbit/s)
scp -v file.txt {u}@{h}:/tmp/ :: Salida detallada para depurar
scp -q file.txt {u}@{h}:/tmp/ :: Modo silencioso
scp -o ConnectTimeout=10 file.txt {u}@{h}:/tmp/ :: Fijar el tiempo de espera de conexión
## SCP|Copia entre dos servidores
scp {u}@{h}:/path/file usuario2@IP2:/path/ :: Copiar entre hosts remotos
scp -3 {u}@{h}:/path/file usuario2@IP2:/path/ :: Pasar la transferencia por tu equipo local
scp -P {p} {u}@{h}:/path/file usuario2@IP2:/path/ :: Puerto personalizado (para ambos hosts)
## SCP|Patrones comunes
scp -r ./site {u}@{h}:/var/www/ :: Desplegar los archivos de una web estática
scp -i ~/.ssh/id_ed25519 -P {p} backup.sql {u}@{h}:/tmp/ :: Subir con clave y puerto personalizados
scp {u}@{h}:/etc/nginx/nginx.conf ./ :: Traer una configuración para revisarla
scp -rp ./configs {u}@{h}:/etc/myapp/ :: Copiar configuraciones conservando metadatos
## SCP|Solución de problemas
ssh-keygen -R {h} :: Si falla «Host key verification failed»: borrar la clave antigua y reintentar
scp -o ConnectTimeout=10 -o ServerAliveInterval=15 file {u}@{h}:/path :: Si la transferencia se bloquea o caduca
scp -O file {u}@{h}:/path/ :: Si da «Protocol error» en OpenSSH 9.0+: usar el protocolo SCP clásico
## SSH|Tipos de clave
ssh-keygen -t ecdsa :: Generar una clave ECDSA (curvas elípticas)
ssh-keygen -t ecdsa -b 521 :: Generar una clave ECDSA de 521 bits
ssh-keygen -t rsa :: Generar una clave RSA (compatible con equipos antiguos)
ssh-keygen -t dsa :: Generar una clave DSA (obsoleta, no usar en instalaciones nuevas)
ssh-keygen -t ed25519 -f ~/.ssh/clave_ed25519 :: Ed25519 con nombre de archivo propio
ssh-keygen -t rsa -b 4096 -f ~/.ssh/clave_rsa :: RSA de 4096 bits con nombre propio
ssh-keygen -t ecdsa -b 521 -f ~/.ssh/clave_ecdsa :: ECDSA de 521 bits con nombre propio
ls -lh ~/.ssh/ :: Listar las claves y comparar sus tamaños
## SSH|Usar una clave privada
ssh -i ~/.ssh/id_ed25519 {u}@{h} :: Conectar con una clave privada concreta
ssh -p {p} -i ~/.ssh/id_ed25519 {u}@{h} :: Conectar con clave privada y puerto personalizado
ssh -i D:\\id_ecdsa {u}@{h} :: Conectar con una clave guardada en un pendrive (Windows)
scp ~/.ssh/id_ecdsa.pub {u}@{h}:~/.ssh/authorized_keys :: Enviar la clave pública al servidor (sobrescribe authorized_keys)
diff (ssh-keygen -y -e -f clave1.pub) (ssh-keygen -y -e -f clave2) :: Comprobar que dos claves coinciden (PowerShell)
## SSH|Servidor SSH en Ubuntu
sudo apt install openssh-server -y :: Instalar el servidor SSH
sudo systemctl enable ssh :: Arrancar SSH automáticamente al iniciar
sudo systemctl start ssh :: Iniciar el servicio SSH
sudo systemctl restart ssh :: Reiniciar SSH tras cambiar la configuración
sudo nano /etc/ssh/sshd_config :: Editar la configuración (por ejemplo, cambiar Port)
## VSFTPD|Instalación y servicio
sudo apt-get install vsftpd :: Instalar el servidor FTP vsftpd
sudo nano /etc/vsftpd.conf :: Editar la configuración de vsftpd
sudo service vsftpd restart :: Reiniciar vsftpd
sudo systemctl restart vsftpd :: Reiniciar vsftpd (systemd)
sudo systemctl status vsftpd :: Ver el estado de vsftpd
## VSFTPD|Configuración (vsftpd.conf)
write_enable=YES :: Permitir escritura (descomentar)
local_umask=022 :: Permisos por defecto de lo que se sube (descomentar)
chroot_local_user=YES :: Encerrar a cada usuario en su carpeta (descomentar)
allow_writeable_chroot=YES :: Permitir escritura en esa carpeta enjaulada (añadir al final)
pasv_enable=YES :: Activar el modo pasivo (añadir al final)
pasv_min_port=40000 :: Primer puerto del rango pasivo
pasv_max_port=40100 :: Último puerto del rango pasivo
## VSFTPD|Usuario FTP
sudo useradd -m {u} -s /usr/sbin/nologin :: Crear el usuario FTP sin acceso a shell
sudo passwd {u} :: Poner contraseña al usuario FTP
sudo nano /etc/shells :: Editar las shells permitidas
/usr/sbin/nologin :: Línea que hay que añadir a /etc/shells
sudo ls -aR1Q /home/{u}/ :: Comprobar en Ubuntu los archivos subidos
## VSFTPD|Cliente Windows y problemas
lcd D:\\Carpeta\\Directorio :: Cambiar la carpeta local del cliente Windows
dir ruta :: Listar archivos en el servidor (con o sin ruta)
200 PORT command successful. Consider using PASV. :: Si la subida se atasca con este mensaje, suele ser el firewall del cliente Windows
## Ubuntu|Sistema
sudo apt update :: Actualizar la lista de paquetes
sudo apt upgrade -y :: Actualizar los paquetes instalados
sudo apt update && sudo apt upgrade -y :: Actualizar el sistema de una vez
ip a :: Ver interfaces y direcciones IP del equipo
COMANDO --help :: Ver las opciones de un comando
man COMANDO :: Abrir el manual de un comando
## Ubuntu|Firewall UFW
sudo ufw status verbose :: Ver el estado del firewall y los puertos permitidos
sudo ufw enable :: Activar el firewall
sudo ufw reload :: Recargar las reglas
sudo ufw allow 22/tcp :: Permitir el puerto 22 (SSH)
sudo ufw allow 21/tcp :: Permitir el puerto 21 (FTP)
sudo ufw allow {p}/tcp :: Permitir un puerto TCP concreto (p. ej. el nuevo puerto SSH)
sudo ufw delete allow 22/tcp :: Eliminar la regla que permite el puerto 22
sudo ufw allow 20/tcp :: Permitir el puerto 20 (si FileZilla conecta pero no lista archivos)
sudo ufw allow 40000:40100/tcp :: Permitir el rango de puertos pasivos de FTP
## Ubuntu|Registros (journalctl)
journalctl :: Consultar los registros de systemd
journalctl -u ssh :: Registros del servicio SSH
journalctl -f :: Ver los registros en tiempo real
journalctl -e :: Ir al final del registro
journalctl -p 3 -xb :: Solo errores críticos del arranque actual
## Ubuntu|Usuarios
sudo adduser usuario :: Añadir usuario (crea también un grupo con su nombre)
sudo useradd usuario :: Añadir usuario (sin carpeta personal)
sudo useradd -m usuario && echo 'usuario:password' | sudo chpasswd :: Crear usuario con /home y contraseña en una línea
sudo passwd usuario :: Cambiar la contraseña de un usuario
sudo userdel usuario :: Borrar un usuario y su grupo por defecto
sudo userdel -r usuario :: Borrar un usuario y toda su carpeta /home
cat /etc/passwd :: Ver todos los usuarios
## Ubuntu|Grupos
sudo groupadd grupo :: Añadir un grupo
sudo groupdel grupo :: Borrar un grupo (cuidado con los del sistema)
sudo adduser usuario grupo :: Añadir un usuario a un grupo
sudo adduser usuario sudo :: Añadir un usuario al grupo sudo
sudo deluser usuario grupo :: Quitar un usuario de un grupo
cat /etc/group :: Ver los grupos del sistema
## Ubuntu|Propietario y permisos
sudo chown usuario ruta/fichero :: Cambiar el propietario de un archivo
sudo chown -R usuario ruta/carpeta :: Cambiar el propietario de una carpeta y su contenido
sudo chown :grupo ruta/archivo :: Cambiar solo el grupo
sudo chown usuario:grupo ruta/archivo :: Cambiar usuario y grupo a la vez
sudo chgrp grupo ruta/archivo :: Cambiar el grupo de un archivo
sudo chgrp -R grupo ruta/carpeta :: Cambiar el grupo de una carpeta y su contenido
sudo chown -R www-data:www-data /var/www/html/MiWordpress :: Dar WordPress al usuario y grupo de Apache
sudo chmod -R XYZ ruta/archivo :: Cambiar permisos (X propietario, Y grupo, Z resto)
sudo chmod -R 775 /var/www/html/MiWordpress :: Permisos totales para usuario y grupo en WordPress
chmod 754 archivo :: Ejemplo: 7 rwx, 5 r-x, 4 r-- (4 lectura, 2 escritura, 1 ejecución)
## Windows|PowerShell y claves
Get-Command ssh :: Comprobar que el cliente SSH está instalado
Test-NetConnection {h} -Port {p} :: Comprobar un puerto de red desde PowerShell
telnet {h} {p} :: Comprobar un puerto de red desde CMD
mv C:\\Users\\usuario\\.ssh\\id_ecdsa F:\\id_ecdsa :: Mover la clave privada a un pendrive
icacls D:\\id_ecdsa /inheritance:r :: Quitar la herencia de permisos de la clave privada
icacls D:\\id_ecdsa /grant:r "$($env:USERNAME):(R)" :: Dar solo lectura al usuario actual sobre la clave
WARNING: UNPROTECTED PRIVATE KEY FILE! :: Error por permisos demasiado abiertos: usa los dos icacls anteriores
New-NetFirewallRule -DisplayName "Permitir FTP cliente puerto 21" -Direction Outbound -Protocol TCP -RemotePort 21 -Action Allow -Profile Any :: Permitir FTP saliente por el puerto 21 (PowerShell como administrador)
## Rutas|Sistema de archivos
/etc/fstab :: Sistemas de archivos que se montan al iniciar
/proc/mounts :: Sistemas de archivos montados ahora (vista real del kernel)
/etc/crypttab :: Volúmenes cifrados (LUKS)
/etc/default/grub :: Configuración de GRUB (aquí sí se edita)
/boot/grub/grub.cfg :: GRUB generado con update-grub (no se edita)
/proc/filesystems :: Sistemas de archivos que soporta el kernel
/proc/partitions :: Particiones detectadas
/proc/diskstats :: Estadísticas de actividad de los discos
/run/media/$USER :: Medios extraíbles en Ubuntu 26.04 (antes /media)
findmnt :: Ver montajes (en vez del antiguo /etc/mtab)
## Rutas|Usuarios y permisos
/etc/passwd :: Información de los usuarios
/etc/shadow :: Contraseñas cifradas y políticas (solo root)
/etc/group :: Grupos del sistema
/etc/gshadow :: Información protegida de los grupos
/etc/login.defs :: Configuración de inicio de sesión y creación de usuarios
/etc/default/useradd :: Valores por defecto al crear usuarios
/etc/sudoers :: Permisos de sudo (editar con visudo)
/etc/sudoers.d/ :: Configuraciones adicionales de sudo
/etc/security/limits.conf :: Límites de recursos de usuarios y procesos
/etc/pam.d/ :: Autenticación PAM
## Rutas|Hardware y dispositivos
/proc/cpuinfo :: Información del procesador
/proc/meminfo :: Información de la memoria RAM
/proc/version :: Versión del kernel
/proc/uptime :: Tiempo que lleva encendido el sistema
/proc/loadavg :: Carga media del sistema (1, 5 y 15 min)
/proc/modules :: Módulos cargados en el kernel
/proc/ioports :: Puertos de entrada/salida en uso
/proc/interrupts :: Interrupciones del sistema
/etc/modules :: Módulos que se cargan en el arranque
/etc/modprobe.d/ :: Configuración de módulos del kernel
/etc/default/apport :: Informes de errores (apport)
## Rutas|Configuración de red
/etc/hostname :: Nombre del equipo
/etc/hosts :: Resolución local de nombres
/etc/resolv.conf :: Configuración DNS (systemd-resolved en 26.04)
/etc/netplan/*.yaml :: Red en Ubuntu Server: forma principal en 26.04
/run/systemd/resolve/ :: Información de systemd-resolved
/proc/net/dev :: Estadísticas de las interfaces de red
/proc/net/tcp :: Conexiones TCP
/sys/class/net/ :: Interfaces de red detectadas
/etc/network/interfaces :: Configuración antigua de red, no usar como principal
## Rutas|Apache
/etc/apache2/apache2.conf :: Configuración principal de Apache
/etc/apache2/ports.conf :: Puertos en los que escucha Apache
/etc/apache2/envvars :: Variables de entorno de Apache
/etc/apache2/sites-available/ :: Sitios disponibles
/etc/apache2/sites-enabled/ :: Sitios habilitados (enlaces creados con a2ensite)
/etc/apache2/mods-available/ :: Módulos disponibles
/etc/apache2/mods-enabled/ :: Módulos habilitados (enlaces creados con a2enmod)
/etc/apache2/sites-available/000-default.conf :: Sitio predeterminado
/var/log/apache2/access.log :: Registro de accesos
/var/log/apache2/error.log :: Registro de errores
## Rutas|PHP y MySQL
/etc/php/*/apache2/php.ini :: PHP para Apache (* = versión instalada)
/etc/php/*/cli/php.ini :: PHP para la línea de comandos
/etc/php/*/mods-available/ :: Módulos PHP disponibles
/etc/php/*/mods-enabled/ :: Módulos PHP habilitados
/etc/mysql/my.cnf :: Configuración principal de MySQL
/etc/mysql/mysql.conf.d/mysqld.cnf :: Configuración del servidor MySQL (bind-address, etc.)
/var/log/mysql/ :: Registros de MySQL, si está configurado
## Rutas|Seguridad (UFW, SSH, Fail2ban)
/etc/default/ufw :: Configuración general de UFW
/etc/ufw/ufw.conf :: Configuración principal de UFW
/etc/ufw/user.rules :: Reglas IPv4 del usuario
/etc/ufw/user6.rules :: Reglas IPv6 del usuario
/etc/ufw/applications.d/ :: Perfiles de aplicaciones de UFW
/etc/ufw/sysctl.conf :: Parámetros de red que usa UFW
/etc/ssh/sshd_config :: Configuración del servidor SSH
/etc/ssh/sshd_config.d/ :: Archivos adicionales del servidor SSH (muy usado en 26.04)
/etc/ssh/ssh_config :: Configuración del cliente SSH
/etc/ssh/ :: Directorio de configuración de SSH
/etc/fail2ban/jail.conf :: Configuración general de Fail2ban
/etc/fail2ban/jail.d/ :: Configuraciones adicionales de Fail2ban
/var/log/fail2ban.log :: Registro de Fail2ban
## Rutas|Registros del sistema
/var/log/syslog :: Registro general (si rsyslog está activo)
/var/log/auth.log :: Autenticaciones y accesos (si rsyslog está activo)
/var/log/kern.log :: Registros del kernel (si están configurados)
/var/log/ :: Directorio general de registros
/etc/rsyslog.conf :: Configuración principal de rsyslog
/etc/rsyslog.d/ :: Configuraciones adicionales de rsyslog
/run/log/journal/ :: Registros temporales de systemd-journald
/var/log/journal/ :: Registros persistentes de systemd-journald
`;

const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const esc = s => s.replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
const $ = s => document.querySelector(s);
const DEF = { u: "usuario", h: "IP", p: "puerto" };
const INPUT = { u: "#f-user", h: "#f-ip", p: "#f-port" };
const val = k => $(INPUT[k]).value.replace(/\s+/g, "");
const plain = c => c.replace(/\{([uhp])\}/g, (_, k) => val(k) || DEF[k]);

const items = [];
let tool, sec;
DATA.trim().split("\n").forEach(l => {
  if (l.startsWith("## ")) [tool, sec] = l.slice(3).split("|");
  else if (l.trim()) {
    const i = l.indexOf(" :: ");
    const c = l.slice(0, i), d = l.slice(i + 4);
    items.push({ tool, sec, c, d, k: norm(`${c.replace(/\{([uhp])\}/g, (_, x) => DEF[x])} ${d} ${sec} ${tool}`) });
  }
});

const tools = ["Todos", ...new Set(items.map(i => i.tool))];
let active = "Todos";

function highlight(text, terms) {
  if (!terms.length) return esc(text);
  const re = new RegExp("(" + terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
  return text.split(re).map((p, n) => n % 2 ? `<mark>${esc(p)}</mark>` : esc(p)).join("");
}

const cmdHtml = (c, raw) => c.split(/(\{[uhp]\})/).map(s => {
  const m = s.match(/^\{([uhp])\}$/);
  return m ? `<span class="var${val(m[1]) ? " set" : ""}">${highlight(val(m[1]) || DEF[m[1]], raw)}</span>` : highlight(s, raw);
}).join("");

function render() {
  const raw = $("#q").value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const terms = raw.map(norm);
  const found = items.filter(i => (active === "Todos" || i.tool === active) && terms.every(t => i.k.includes(t)));
  if (terms.length) found.sort((a, b) => norm(b.c).startsWith(terms[0]) - norm(a.c).startsWith(terms[0]));

  document.querySelectorAll(".chip small").forEach(s => {
    const t = s.parentElement.dataset.tool;
    s.textContent = items.filter(i => (t === "Todos" || i.tool === t) && terms.every(x => i.k.includes(x))).length;
  });
  $("#features").hidden = terms.length > 0 || active !== "Todos";
  if (!terms.length && active === "Todos") {
    $("#count").textContent = "";
    $("#list").innerHTML = "";
    return;
  }
  $("#count").textContent = `${found.length} ${found.length === 1 ? "comando" : "comandos"}`;

  if (!found.length) {
    $("#list").innerHTML = `<div class="empty"><b>Sin resultados para «${esc($("#q").value)}»</b><br>Prueba con otra palabra, como «subir», «puerto» o «clave», o cambia de herramienta.</div>`;
    return;
  }
  let html = "", last = "";
  found.forEach((i, n) => {
    const g = terms.length ? "" : `${i.tool} · ${i.sec}`;
    if (g !== last) { html += g ? `<h2 class="group">${esc(i.sec)}<span>${i.tool}</span></h2>` : ""; last = g; }
    html += `<article class="card"><code>${cmdHtml(i.c, raw)}</code><span class="tag">${i.tool}</span>
      <p>${highlight(i.d, raw)}</p><button class="copy" data-i="${items.indexOf(i)}">Copiar</button></article>`;
  });
  $("#list").innerHTML = html;
}

$("#chips").innerHTML = tools.map(t =>
  `<button class="chip" role="tab" data-tool="${t}" aria-selected="${t === active}">${t}<small></small></button>`).join("");
$("#chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  active = b.dataset.tool;
  document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-selected", c === b));
  render();
});

$("#list").addEventListener("click", async e => {
  const b = e.target.closest(".copy"); if (!b) return;
  try { await navigator.clipboard.writeText(plain(items[b.dataset.i].c)); b.textContent = "¡Copiado!"; }
  catch { b.textContent = "No se pudo copiar"; }
  setTimeout(() => (b.textContent = "Copiar"), 1500);
});

$("#q").addEventListener("input", render);
Object.values(INPUT).forEach(sel => $(sel).addEventListener("input", e => {
  if (sel === INPUT.p) e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
  render();
}));
document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement !== $("#q")) { e.preventDefault(); $("#q").focus(); }
  if (e.key === "Escape") { $("#q").value = ""; render(); }
});

// Enlace y estrellas del repositorio de GitHub
$("#gh").href = `https://github.com/${USER}/${REPO}`;
$(".repo").textContent = `${USER}/${REPO}`;
fetch(`https://api.github.com/repos/${USER}/${REPO}`)
  .then(r => (r.ok ? r.json() : Promise.reject()))
  .then(j => ($("#stars").textContent = j.stargazers_count))
  .catch(() => {});

$("#total").textContent = items.length;

// Tema claro y oscuro
$("#theme").addEventListener("click", () => {
  const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
});

render();
