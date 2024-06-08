local peripherallist = {peripheral.find("inventory")}

function calculateStock()
	local file = fs.open("dump","a")
	local currentstock = {wheat=0,carrot=0,cabbage=0,potato=0,wheatseed=0,cabbageseed=0}
	for _,inventory in pairs(peripherallist) do
		local itemList = inventory.list()
		if type(itemList) == 'table' then
			for k,v in pairs(itemList) do
				if v.name == "minecraft:wheat" then
					currentstock.wheat = currentstock.wheat + v.count
				elseif v.name == "minecraft:carrot" then
					currentstock.carrot = currentstock.carrot + v.count
				elseif v.name == "minecraft:potato" then
					currentstock.potato = currentstock.potato + v.count
				elseif v.name == "minecraft:wheat_seeds" then
					currentstock.wheatseed = currentstock.wheatseed + v.count
				elseif v.name == "farmersdelight:cabbage_seeds" then
					currentstock.cabbageseed = currentstock.cabbageseed + v.count
				elseif v.name == "farmersdelight:cabbage" then
					currentstock.cabbage = currentstock.cabbage + v.count
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
	if currentstock.wheat > prevStock.wheat then
		local dif = currentstock.wheat - prevStock.wheat
		local reqstring = '{"item":"wheat","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding wheat " .. dif)
	elseif currentstock.wheat < prevStock.wheat then
		local dif = prevStock.wheat - currentstock.wheat
		local reqstring = '{"item":"wheat","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing wheat " .. dif)
	end
	if currentstock.carrot > prevStock.carrot then
		local dif = currentstock.carrot - prevStock.carrot
		local reqstring = '{"item":"carrot","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding carrot " .. dif)
	elseif currentstock.carrot < prevStock.carrot then
		local dif = prevStock.carrot - currentstock.carrot
		local reqstring = '{"item":"carrot","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing carrot " .. dif)
	end
	if currentstock.cabbage > prevStock.cabbage then
		local dif = currentstock.cabbage - prevStock.cabbage
		local reqstring = '{"item":"cabbage","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding cabbage " .. dif)
	elseif currentstock.cabbage < prevStock.cabbage then
		local dif = prevStock.cabbage - currentstock.cabbage
		local reqstring = '{"item":"cabbage","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing cabbage " .. dif)
	end
	if currentstock.potato > prevStock.potato then
		local dif = currentstock.potato - prevStock.potato
		local reqstring = '{"item":"potato","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding potato " .. dif)
	elseif currentstock.potato < prevStock.potato then
		local dif = prevStock.potato - currentstock.potato
		local reqstring = '{"item":"potato","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing potato " .. dif)
	end
	if currentstock.wheatseed > prevStock.wheatseed then
		local dif = currentstock.wheatseed - prevStock.wheatseed
		local reqstring = '{"item":"wheatseed","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding wheatseed " .. dif)
	elseif currentstock.wheatseed < prevStock.wheatseed then
		local dif = prevStock.wheatseed - currentstock.wheatseed
		local reqstring = '{"item":"wheatseed","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing wheatseed " .. dif)
	end
	if currentstock.cabbageseed > prevStock.cabbageseed then
		local dif = currentstock.cabbageseed - prevStock.cabbageseed
		local reqstring = '{"item":"cabbageseed","method":"ADD","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Adding cabbageseed " .. dif)
	elseif currentstock.cabbageseed < prevStock.cabbageseed then
		local dif = prevStock.cabbageseed - currentstock.cabbageseed
		local reqstring = '{"item":"cabbageseed","method":"REMOVE","amount":'..dif..'}'
		http.request { url = "https://server-of-axel.pxl.bjth.xyz/api/post", method="POST",body=reqstring,headers={["content-type"]="application/json"}}
		print("Removing cabbageseed " .. dif)
	end
	prevStock = currentstock
	sleep(20)
end
--print(names.getSize())


--local names = peripheral.wrap("bottom")