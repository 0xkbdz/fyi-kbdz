export default function get_survivor_stats_query (is_linked = false) {
    if (is_linked) {
        return `
            select * from (
            select
                dp.did, dp.pid,
                ps.psid as psid,
                ps.psname as survivor,
                ps.pskills as kills,
                ps.psdeaths as deaths,
                ps.pskd as kd,
                ps.psdamage as damage,
                ps.pscurrentkillstreak as cks,
                ps.psbestkillstreak bks,
                ps.psbestmeters as bestmeters,
                ps.psheadshots as hs,
                ps.psbrainshots as bs,
                ps.pstokens as bank,
                ps.pswages as wages,
                ps.pscurrentsurvivaltime as cst,
                ps.psbestsurvivaltime as bst,
                ps.pstimeonserver as ton,
                ps.psconnected as online,
                ps.pskosauthorized as kosauthorized,
                (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) as score,
                row_number() over(order by (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) desc) as rankk,
                (select count(*) from dayz_players_rolling_stats ps, nitrado_servers s where ps.sid = s.sid and s.sid = $1) as of
            from
                discords_dayz_players dp,
                dayz_players_rolling_stats ps,
                dayz_players p,
                nitrado_servers s
            where
                dp.pid = ps.pid and ps.pid = p.pid and ps.sid = s.sid and s.sid = $1
            group by
                dp.did, dp.pid, ps.psid, ps.psname, ps.pskills, ps.psdeaths, ps.pskd,
                ps.psdamage, ps.psbestmeters, ps.psheadshots, ps.psbrainshots,
                ps.psconnected, ps.pscurrentkillstreak, ps.psbestkillstreak,
                ps.pstokens, ps.pswages, ps.pscurrentsurvivaltime, ps.psbestsurvivaltime,
                ps.pstimeonserver, ps.pskosauthorized
            order by (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) desc
            ) as leaderboard where leaderboard.psid = $2;            
        `
    } else {
        return `
            select * from (
            select
                ps.psid as psid,
                ps.psname as survivor,
                ps.pskills as kills,
                ps.psdeaths as deaths,
                ps.pskd as kd,
                ps.psdamage as damage,
                ps.pscurrentkillstreak as cks,
                ps.psbestkillstreak bks,
                ps.psbestmeters as bestmeters,
                ps.psheadshots as hs,
                ps.psbrainshots as bs,
                ps.pstokens as bank,
                ps.pswages as wages,
                ps.pscurrentsurvivaltime as cst,
                ps.psbestsurvivaltime as bst,
                ps.pstimeonserver as ton,
                ps.psconnected as online,
                ps.pskosauthorized as kosauthorized,
                (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) as score,
                row_number() over(order by (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) desc) as rankk,
                (select count(*) from dayz_players_rolling_stats ps, nitrado_servers s where ps.sid = s.sid and s.sid = $1) as of
            from
                dayz_players_rolling_stats ps,
                dayz_players p,
                nitrado_servers s
            where
                ps.pid = p.pid and ps.sid = s.sid and s.sid = $1
            group by
                ps.psid, ps.psname, ps.pskills, ps.psdeaths, ps.pskd,
                ps.psdamage, ps.psbestmeters, ps.psheadshots, ps.psbrainshots,
                ps.psconnected, ps.pscurrentkillstreak, ps.psbestkillstreak,
                ps.pstokens, ps.pswages, ps.pscurrentsurvivaltime, ps.psbestsurvivaltime,
                ps.pstimeonserver, ps.pskosauthorized
            order by (ps.psheadshots + ps.psbrainshots + ps.pskd + (ps.psbestmeters * 0.005) + (ps.psdamage * 0.005) + ps.pskills - ps.psdeaths) desc
            ) as leaderboard where leaderboard.psid = $2;            
        `
    }
}

