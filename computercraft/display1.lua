local peripherallist = {peripheral.find("inventory")}

function calculateStock()
	local file = fs.open("dump","a")
	local currentstock = {sandwich=0,egg=0,feather=0,wool=0}
	for _,inventory in pairs(peripherallist) do
		local itemList = inventory.list()
		if type(itemList) == 'table' then
			for k,v in pairs(itemList) do
				if v.name == "minecraft:white_wool" then
					currentstock.wool = currentstock.wool + v.count
				elseif v.name == "minecraft:black_wool" then
					currentstock.wool = currentstock.wool + v.count
				elseif v.name == "minecraft:gray_wool" then
					currentstock.wool = currentstock.wool + v.count
				elseif v.name == "minecraft:light_gray_wool" then
					currentstock.wool = currentstock.wool + v.count
				elseif v.name == "minecraft:feather" then
					currentstock.feather = currentstock.feather + v.count
				elseif v.name == "minecraft:egg" then
					currentstock.egg = currentstock.egg + v.count
				elseif v.name == "farmersdelight:chicken_sandwich" then
					currentstock.sandwich = currentstock.sandwich + v.count
				end
				-- file.write(textutils.serialise(v))
			end
		end
	end
	file.close()
	return currentstock
end

local prevStock = calculateStock()
while(true)
do
	local currentstock = calculateStock()
	if currentstock.sandwich > prevStock.sandwich then
		local dif = currentstock.sandwich - prevStock.sandwich
		local reqstring = '{"item":"sandwich","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding sandwich " .. dif)
	elseif currentstock.sandwich < prevStock.sandwich then
		local dif = prevStock.sandwich - currentstock.sandwich
		local reqstring = '{"item":"sandwich","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing sandwich " .. dif)
	end
	if currentstock.egg > prevStock.egg then
		local dif = currentstock.egg - prevStock.egg
		local reqstring = '{"item":"egg","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding egg " .. dif)
	elseif currentstock.egg < prevStock.egg then
		local dif = prevStock.egg - currentstock.egg
		local reqstring = '{"item":"egg","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing egg " .. dif)
	end
	if currentstock.feather > prevStock.feather then
		local dif = currentstock.feather - prevStock.feather
		local reqstring = '{"item":"feather","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding feather " .. dif)
	elseif currentstock.feather < prevStock.feather then
		local dif = prevStock.feather - currentstock.feather
		local reqstring = '{"item":"feather","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing feather " .. dif)
	end
	if currentstock.wool > prevStock.wool then
		local dif = currentstock.wool - prevStock.wool
		local reqstring = '{"item":"wool","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding wool " .. dif)
	elseif currentstock.wool < prevStock.wool then
		local dif = prevStock.wool - currentstock.wool
		local reqstring = '{"item":"wool","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing wool " .. dif)
	end
	prevStock = currentstock
	sleep(20)
end
--print(names.getSize())