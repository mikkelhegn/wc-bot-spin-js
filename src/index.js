const encoder = new TextEncoder('utf-8')
const decoder = new TextDecoder('utf-8')

export async function handleRequest(request) {
    var matchesRaw = await fetch('https://worldcupjson.net/matches/today')
    var matchesBody = decoder.decode(await matchesRaw.arrayBuffer() || new Uint8Array())
    var matches = JSON.parse(matchesBody)

    var matchInfo = ''
    
    matches.forEach(match => {
        matchInfo +=
            match.home_team.name + ' vs. ' + 
            match.away_team.name + ' ' +
            match.home_team.goals + '-' + 
            match.away_team.goals + ' ' +
            match.status + '\n'
    })
    
    var resBody = {
        'response_type': 'in_channel',
        'text': matchInfo
    }
    
    var resp = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
             },
        body: encoder.encode(JSON.stringify(resBody)).buffer
    }
    
    return resp
}
